// bootstrap.js
// CSVenue Plugin - Zotero 7 Bootstrap Entry Point
//
// Lifecycle:  install → startup → [use] → shutdown → uninstall
// Registers:
//   · Two custom columns in the item tree ("会议" and "CCF")
//   · A right-click context menu item for DBLP lookup

/* global Zotero, Services, Components */
"use strict";

// ─── Plugin singleton ────────────────────────────────────────────────────────

var CSVenuePlugin = {
  // Filled during startup()
  rootURI: null,
  matcher: null,

  // Track added DOM elements per window so we can remove them on shutdown
  // Map<Window, Element[]>
  _windowElements: new Map(),

  // Track the column registrations returned by Zotero.ItemTreeManager
  _columnRegistrationIds: null,

  // Window listener handle
  _windowListener: null,

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  async startup({ id, version, resourceURI, rootURI }) {
    this.rootURI = rootURI;

    // Wait for Zotero to finish initializing its databases / UI
    await Zotero.initializationPromise;

    // Load venue database and matcher into an isolated scope
    const scope = {};
    Services.scriptloader.loadSubScript(rootURI + "src/venues.js", scope);
    Services.scriptloader.loadSubScript(rootURI + "src/matcher.js", scope);
    this.matcher = new scope.CSVenueMatcher(scope.VENUE_DB);

    // Register custom columns
    this._registerColumns();

    // Inject UI into every already-open main window
    for (const win of Zotero.getMainWindows()) {
      this._addToWindow(win);
    }

    // Listen for future windows (e.g. user opens a second Zotero window)
    this._windowListener = {
      onOpenWindow: (xulWindow) => {
        const win = xulWindow.docShell?.domWindow;
        if (!win) return;
        win.addEventListener(
          "load",
          () => { if (win.ZoteroPane) this._addToWindow(win); },
          { once: true }
        );
      },
      onCloseWindow: () => {},
      onWindowTitleChange: () => {},
    };
    Services.wm.addListener(this._windowListener);

    Zotero.debug("[CSVenue] Plugin started successfully.");
  },

  shutdown() {
    // Remove window listener
    if (this._windowListener) {
      Services.wm.removeListener(this._windowListener);
      this._windowListener = null;
    }

    // Remove injected DOM elements from every window
    for (const win of Zotero.getMainWindows()) {
      this._removeFromWindow(win);
    }
    this._windowElements.clear();

    // Unregister columns
    this._unregisterColumns();

    this.matcher = null;
    Zotero.debug("[CSVenue] Plugin shut down.");
  },

  install() {
    Zotero.debug("[CSVenue] Plugin installed.");
  },

  uninstall() {
    Zotero.debug("[CSVenue] Plugin uninstalled.");
  },

  // ── Column registration ────────────────────────────────────────────────────

  _registerColumns() {
    const pluginID = "csvenue@zotero-plugin";

    // NOTE: In Zotero 9, ItemTreeManager requires width to be a string, not number.
    this._columnRegistrationIds = Zotero.ItemTreeManager.registerColumns([
      {
        pluginID,
        dataKey: "csvenue-abbr",
        label: "Venue",
        tooltip: "CS Conference Abbreviation (CSVenue Plugin)",
        flex: 1,
        width: "90",           // 必须是字符串
        staticSortIndicator: true,
        enabledTreeIDs: ["main"],
        dataProvider: (item, _dataKey) => {
          if (!this.matcher) return "";
          try { return this.matcher.getAbbr(item); } catch (e) { return ""; }
        },
      },
      {
        pluginID,
        dataKey: "csvenue-rank",
        label: "CCF",
        tooltip: "CCF Recommended Rank (CSVenue Plugin)",
        flex: 0,
        width: "46",           // 必须是字符串
        staticSortIndicator: true,
        enabledTreeIDs: ["main"],
        dataProvider: (item, _dataKey) => {
          if (!this.matcher) return "";
          try { return this.matcher.getRank(item); } catch (e) { return ""; }
        },
      },
    ]);
  },

  _unregisterColumns() {
    if (this._columnRegistrationIds) {
      Zotero.ItemTreeManager.unregisterColumns(this._columnRegistrationIds);
      this._columnRegistrationIds = null;
    }
  },

  // ── Window / DOM management ───────────────────────────────────────────────

  _addToWindow(win) {
    if (this._windowElements.has(win)) return; // already added
    const doc = win.document;
    const elements = [];

    // ── Inject CSS ────────────────────────────────────────────────────────
    const existingStyles = doc.querySelectorAll("#csvenue-styles");
    existingStyles.forEach(el => el.remove());

    const style = doc.createElement("style");
    style.id = "csvenue-styles";
    style.textContent = `
      /* CSVenue: Native text rendering used for columns */
    `;
    (doc.head || doc.documentElement).appendChild(style);
    elements.push(style);

    // ── Inject context menu item ──────────────────────────────────────────
    const itemMenu = doc.getElementById("zotero-itemmenu");
    if (itemMenu) {
      // Defensive cleanup: remove ALL orphaned elements from previous crashed instances
      const orphanSeps = doc.querySelectorAll("#csvenue-menusep");
      orphanSeps.forEach(el => el.remove());
      const orphanMenus = doc.querySelectorAll("#csvenue-dblp-lookup");
      orphanMenus.forEach(el => el.remove());

      const sep = doc.createXULElement("menuseparator");
      sep.id = "csvenue-menusep";
      itemMenu.appendChild(sep);
      elements.push(sep);

      const menuitem = doc.createXULElement("menuitem");
      menuitem.id = "csvenue-dblp-lookup";
      menuitem.setAttribute("label", "🔍 Lookup venue via DBLP");
      menuitem.setAttribute("tooltiptext",
        "Query DBLP online for the CS conference of the paper and save the result to the Extra field");
      menuitem.addEventListener("command", () => this._onDblpLookupCommand(win));
      itemMenu.appendChild(menuitem);
      elements.push(menuitem);

      // Show / hide menu item based on selection
      itemMenu.addEventListener("popupshowing", () => {
        const items = this._getSelectedRegularItems(win);
        menuitem.setAttribute("disabled", items.length === 0 ? "true" : "false");
      });
    }

    // ── Inject collection context menu item ─────────────────────────────────
    const collectionMenu = doc.getElementById("zotero-collectionmenu");
    if (collectionMenu) {
      // Defensive cleanup: remove ALL orphaned elements from previous crashed instances
      const orphanColMenus = doc.querySelectorAll("#csvenue-collection-lookup");
      orphanColMenus.forEach(el => el.remove());

      const colMenuitem = doc.createXULElement("menuitem");
      colMenuitem.id = "csvenue-collection-lookup";
      colMenuitem.setAttribute("label", "🔍 Lookup missing venues in collection");
      colMenuitem.addEventListener("command", () => this._onCollectionLookupCommand(win));
      collectionMenu.appendChild(colMenuitem);
      elements.push(colMenuitem);
    }

    this._windowElements.set(win, elements);
  },

  _removeFromWindow(win) {
    const elements = this._windowElements.get(win);
    if (!elements) return;
    for (const el of elements) {
      el.remove();
    }
    this._windowElements.delete(win);
  },

  // ── DBLP lookup command ───────────────────────────────────────────────────

  async _onDblpLookupCommand(win) {
    const items = this._getSelectedRegularItems(win);
    if (!items.length) return;
    await this._performBatchLookup(win, items, "CSVenue: Querying DBLP...");
  },

  async _onCollectionLookupCommand(win) {
    const pane = win.ZoteroPane;
    if (!pane) return;
    
    // Get the currently selected collection
    const collection = pane.getSelectedCollection();
    if (!collection) {
      // If My Library or something else is selected
      Zotero.debug("[CSVenue] No collection selected or not a valid collection.");
      return;
    }

    // Get all items in the collection, including children
    let items = collection.getChildItems(false);
    // Filter out attachments and notes
    items = items.filter(item => !item.isAttachment() && !item.isNote());
    
    if (!items.length) return;
    await this._performBatchLookup(win, items, `CSVenue: Scanning collection "${collection.name}"...`);
  },

  async _performBatchLookup(win, items, headline) {
    // Show progress notification
    const progressWin = new Zotero.ProgressWindow({ closeOnClick: true });
    progressWin.changeHeadline(headline);
    const progressItem = new progressWin.ItemProgress("chrome://zotero/skin/tick.png", "");
    progressWin.show();

    let successCount = 0;
    let failCount = 0;
    let skipCount = 0;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      progressItem.setText(
        `[${i + 1}/${items.length}] ${item.getField("title").slice(0, 60)}`
      );

      // Skip items that already have a venue matched
      const existing = this.matcher.getVenue(item);
      if (existing && existing.area !== "Manual" && existing.abbr) {
        skipCount++;
        continue;
      }

      try {
        const result = await this.matcher.lookupViaDblp(item);
        if (result) {
          successCount++;
        } else {
          failCount++;
        }
      } catch (e) {
        Zotero.debug(`[CSVenue] Lookup error: ${e}`);
        failCount++;
      }

      // Rate limit: 400 ms between requests to be polite to DBLP
      if (i < items.length - 1) {
        await this._sleep(400);
      }
    }

    // Refresh the item tree so new values appear
    this._refreshItemTree(win, items);

    // Show result summary
    const summary = [
      successCount > 0 ? `✅ ${successCount} found` : null,
      failCount > 0    ? `❌ ${failCount} not found` : null,
      skipCount > 0    ? `⏭ ${skipCount} skipped (already matched)` : null,
    ].filter(Boolean).join(", ");

    progressItem.setProgress(100);
    progressItem.setText(summary || "Done");
    progressWin.startCloseTimer(4000);
  },

  // ── Helpers ──────────────────────────────────────────────────────────────

  _getSelectedRegularItems(win) {
    const pane = win.ZoteroPane;
    if (!pane) return [];
    try {
      return pane.getSelectedItems().filter(
        (item) => !item.isAttachment() && !item.isNote()
      );
    } catch (e) {
      return [];
    }
  },

  _refreshItemTree(win, items) {
    try {
      // Invalidate matcher cache for all affected items
      for (const item of items) {
        this.matcher.invalidate(item.id);
      }
      // The Notifier system will cause the item tree to re-query dataProvider
      Zotero.Notifier.trigger(
        "modify",
        "item",
        items.map((i) => i.id),
        { skipAutoSync: true }
      );
    } catch (e) {
      Zotero.debug(`[CSVenue] refreshItemTree error: ${e}`);
    }
  },

  _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};

// ─── Bootstrap entry points (must be top-level functions) ────────────────────

function startup(data) {
  return CSVenuePlugin.startup(data);
}

function shutdown(data) {
  return CSVenuePlugin.shutdown(data);
}

function install(data) {
  return CSVenuePlugin.install(data);
}

function uninstall(data) {
  return CSVenuePlugin.uninstall(data);
}
