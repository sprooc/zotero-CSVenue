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
        renderCell: (index, data, column) => {
          // column may be a DOM element or config object depending on Zotero version
          const doc = column?.ownerDocument ?? Zotero.getMainWindow()?.document;
          if (!doc) return null;
          const span = doc.createElement("span");
          span.className = "cell label csvenue-abbr-cell";
          span.textContent = data ?? "";
          span.title = data ?? "";
          return span;
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
        renderCell: (index, data, column) => {
          const doc = column?.ownerDocument ?? Zotero.getMainWindow()?.document;
          if (!doc) return null;
          const span = doc.createElement("span");
          span.className = "cell label csvenue-rank-cell";
          span.setAttribute("data-rank", data ?? "");
          span.textContent = data ?? "";
          return span;
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

    // ── Inject CSS for CCF rank badges ────────────────────────────────────
    const style = doc.createElement("style");
    style.id = "csvenue-styles";
    style.textContent = `
      /* CSVenue: CCF rank badge colours */
      .csvenue-rank-cell[data-rank="A"] { color: #d73a49; font-weight: 700; }
      .csvenue-rank-cell[data-rank="B"] { color: #e36209; font-weight: 600; }
      .csvenue-rank-cell[data-rank="C"] { color: #0366d6; font-weight: 500; }
      .csvenue-rank-cell[data-rank="?"] { color: #6a737d; }
      .csvenue-abbr-cell              { font-size: 11px; font-family: monospace; }
    `;
    (doc.head || doc.documentElement).appendChild(style);
    elements.push(style);

    // ── Inject context menu item ──────────────────────────────────────────
    const itemMenu = doc.getElementById("zotero-itemmenu");
    if (itemMenu) {
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

    const label = items.length === 1
      ? `"${items[0].getField("title").slice(0, 50)}"`
      : `${items.length} items`;

    // Show progress notification
    const progressWin = new Zotero.ProgressWindow({ closeOnClick: false });
    progressWin.changeHeadline(`CSVenue: Querying DBLP...`);
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

      // Skip items that already have a venue from local matching
      const existing = this.matcher.getVenue(item);
      if (existing && existing.area !== "Manual") {
        // Already matched locally — still try if user explicitly chose DBLP
        // but skip to avoid overwriting clean local data
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
    ].filter(Boolean).join(", ");

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
