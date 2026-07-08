// src/matcher.js
// CSVenue Plugin - Venue Matching Engine
//
// Priority order:
//   1. Extra field manual annotation:  CSVenue: OSDI
//   2. Local database keyword matching (proceedingsTitle, conferenceName, etc.)
//   3. Empty (DBLP lookup available via right-click menu)

/* global VENUE_DB, Zotero */

var CSVenueMatcher = class CSVenueMatcher {

  constructor(db) {
    this.db = db || VENUE_DB;
    // In-session cache: itemID (number) -> venue entry | null
    this._cache = new Map();
    this._buildIndex();
  }

  // ------------------------------------------------------------------
  // Index construction
  // ------------------------------------------------------------------

  _buildIndex() {
    // Map from dblp key (lowercase) -> venue entry
    this._dblpIndex = new Map();
    // Array of { text, venue } sorted by text length descending (more specific first)
    this._aliasIndex = [];

    for (const venue of this.db) {
      // DBLP keys
      for (const key of (venue.dblp || [])) {
        this._dblpIndex.set(key.toLowerCase(), venue);
      }
      // Abbreviation itself as a DBLP key (some DBLP responses use the abbr directly)
      this._dblpIndex.set(venue.abbr.toLowerCase(), venue);

      // Alias entries
      for (const alias of (venue.aliases || [])) {
        if (alias && alias.length > 0) {
          this._aliasIndex.push({ text: alias.toLowerCase(), venue });
        }
      }
    }

    // Sort: longer/more-specific patterns first to avoid premature short matches
    this._aliasIndex.sort((a, b) => b.text.length - a.text.length);
  }

  // ------------------------------------------------------------------
  // Public API
  // ------------------------------------------------------------------

  /**
   * Returns a venue entry { abbr, rank, area } or null.
   * Results are cached for the session lifetime.
   */
  getVenue(item) {
    if (this._cache.has(item.id)) {
      return this._cache.get(item.id);
    }
    const result = this._resolve(item);
    this._cache.set(item.id, result);
    return result;
  }

  /** Convenience: returns abbreviated name string, or "" */
  getAbbr(item) {
    const v = this.getVenue(item);
    return v ? v.abbr : "";
  }

  /** Convenience: returns CCF rank string ("A" / "B" / "C"), or "" */
  getRank(item) {
    const v = this.getVenue(item);
    return v ? v.rank : "";
  }

  /**
   * Invalidate cached result for a single item (e.g., after DBLP lookup writes to Extra).
   */
  invalidate(itemId) {
    this._cache.delete(itemId);
  }

  /** Invalidate all cached results. */
  clearCache() {
    this._cache.clear();
  }

  // ------------------------------------------------------------------
  // Local resolution logic
  // ------------------------------------------------------------------

  _resolve(item) {
    // Skip attachments, notes, etc.
    if (item.isAttachment() || item.isNote()) return null;

    // 1. Manual annotation in Extra field
    const fromExtra = this._readExtraAnnotation(item);
    if (fromExtra !== null) return fromExtra;

    // 2. Match against Zotero metadata fields
    const fields = [
      item.getField("conferenceName"),
      item.getField("proceedingsTitle"),
      item.getField("publicationTitle"),
      item.getField("series"),
      item.getField("journalAbbreviation"),
    ].filter(Boolean);

    for (const fieldValue of fields) {
      const match = this._matchText(fieldValue);
      if (match) return match;
    }

    return null;
  }

  /**
   * Check Extra field for a manual "CSVenue: ABBR" annotation.
   * Returns a venue entry, a synthetic entry for unknown venues, or null.
   */
  _readExtraAnnotation(item) {
    const extra = item.getField("extra") || "";
    const m = extra.match(/^CSVenue:\s*(.+?)(\s*\n|$)/mi);
    if (!m) return null;

    const annotated = m[1].trim();
    // Try to find it in the DB
    const found = this.db.find(
      (v) => v.abbr.toLowerCase() === annotated.toLowerCase()
    );
    if (found) return found;

    // Unknown venue manually annotated — honour it with rank '?'
    return { abbr: annotated, rank: "?", area: "Manual" };
  }

  /**
   * Attempt alias-based matching against a raw field string.
   */
  _matchText(text) {
    if (!text || text.length === 0) return null;
    // Normalize: lowercase, collapse whitespace, keep alphanumeric + basic punctuation
    const norm = text
      .toLowerCase()
      .replace(/[''`]/g, "'")
      .replace(/\s+/g, " ")
      .trim();

    for (const { text: pattern, venue } of this._aliasIndex) {
      if (norm.includes(pattern)) {
        return venue;
      }
    }
    return null;
  }

  // ------------------------------------------------------------------
  // DBLP Online Lookup
  // ------------------------------------------------------------------

  /**
   * Query DBLP for the given item by title.
   * On success:
   *   - Writes  "CSVenue: ABBR"  to the item's Extra field
   *   - Invalidates cache so the column refreshes automatically
   * Returns the matched venue entry, or null.
   */
  async lookupViaDblp(item) {
    const title = item.getField("title");
    if (!title) return null;

    const query = encodeURIComponent(title.trim().replace(/\s+/g, " "));
    const url = `https://dblp.org/search/publ/api?q=${query}&format=json&h=5`;

    let response;
    try {
      response = await Zotero.HTTP.request("GET", url, {
        headers: { "User-Agent": "Zotero-CSVenue/1.0 (github.com/your-name/zotero-CSVenue)" },
        timeout: 12000,
      });
    } catch (e) {
      Zotero.debug(`[CSVenue] DBLP HTTP error for "${title}": ${e}`);
      return null;
    }

    let data;
    try {
      data = JSON.parse(response.responseText);
    } catch (e) {
      Zotero.debug(`[CSVenue] DBLP JSON parse error: ${e}`);
      return null;
    }

    const hits = data?.result?.hits?.hit;
    if (!hits || !Array.isArray(hits)) return null;

    for (const hit of hits) {
      const venue = hit?.info?.venue;
      if (!venue) continue;

      const matched = this._matchDblpVenue(venue);
      if (matched) {
        // Write result to Extra field so it persists across sessions
        await this._writeExtraAnnotation(item, matched);
        this.invalidate(item.id);
        return matched;
      }
    }

    Zotero.debug(`[CSVenue] DBLP: no CCF match for "${title}"`);
    return null;
  }

  /**
   * Match a DBLP venue string against our database.
   */
  _matchDblpVenue(dblpVenue) {
    if (!dblpVenue) return null;
    const key = dblpVenue.toLowerCase().trim();

    // Direct DBLP key lookup
    if (this._dblpIndex.has(key)) {
      return this._dblpIndex.get(key);
    }

    // Also try alias matching on the DBLP venue string itself
    return this._matchText(dblpVenue);
  }

  /**
   * Prepend "CSVenue: ABBR\n" to the item's Extra field.
   * Avoids duplication if already present.
   */
  async _writeExtraAnnotation(item, venue) {
    const currentExtra = item.getField("extra") || "";

    // Don't add if already annotated
    if (/^CSVenue:/mi.test(currentExtra)) return;

    const prefix = `CSVenue: ${venue.abbr}\n`;
    item.setField("extra", prefix + currentExtra);

    try {
      await item.saveTx();
    } catch (e) {
      Zotero.debug(`[CSVenue] Failed to save Extra field: ${e}`);
    }
  }
};
