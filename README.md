# Zotero CSVenue Plugin

**CSVenue** is a Zotero 7 plugin designed for Computer Science researchers.
It automatically identifies the CS conference of a paper and displays the **Conference Abbreviation** (e.g., `OSDI`, `NeurIPS`) and the **CCF Rank** (A / B / C) in the Zotero item list. It also supports online queries via DBLP for papers that cannot be identified automatically.

---

## Features

| Feature                         | Description                                                                          |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| 📋**Venue Column**        | Adds a "Venue" column in the item list, displaying standard abbreviations            |
| 🏅**CCF Column**          | Adds a "CCF" column, color-coded for A (Red) / B (Orange) / C (Blue)                 |
| 🔍**DBLP Online Query**   | Right-click menu "Lookup venue via DBLP" to automatically search and save the result |
| ✏️**Manual Annotation** | Write `CSVenue: OSDI` in the Extra field to manually specify and permanently save  |
| 💾**Database Coverage**   | Built-in CCF A/B/C list of**160+** conferences based on the CCF 2022 Catalog   |

---

## Installation

### Method 1: Install XPI directly (Recommended)

1. Download the latest `.xpi` file from [Releases](https://github.com/sprooc/zotero-CSVenue/releases).
2. In Zotero: `Tools → Add-ons → Install Add-on From File...`
3. Select the downloaded `.xpi` file and restart Zotero.

### Method 2: Build from Source

```powershell
# Clone the repository
git clone https://github.com/sprooc/zotero-CSVenue.git
cd zotero-CSVenue

# Package as XPI (XPI is essentially a ZIP archive)
tar -a -c -f CSVenue.xpi manifest.json bootstrap.js src
```

Then install `CSVenue.xpi` as described in Method 1.

---

## Usage

### Displaying Conference Columns

1. Right-click the **column header** in the Zotero item list.
2. Check the "**Venue**" and "**CCF**" columns.
3. The identification results will be displayed in the list.

### Identification Logic (Priority from High to Low)

```
Extra field manual annotation  →  Local database keyword matching  →  Empty (Can trigger DBLP query)
```

### DBLP Online Query

For papers that **cannot be matched by the local database**:

1. Select one or more papers in the item list.
2. **Right-click** → "🔍 Lookup venue via DBLP".
3. The plugin will automatically query DBLP by paper title. Once found:
   - It writes `CSVenue: ABBR` to the Extra field (saved permanently).
   - The abbreviation will immediately appear in the list.

> **Rate Limit Note**: There is a 400 ms interval between requests to avoid stressing the DBLP servers.

### Manual Annotation

Add the following line anywhere in the Extra field:

```
CSVenue: OSDI
```

The plugin will prioritize reading this annotation and supports any abbreviation (even if it's not in the built-in database).

---

## Coverage

| Area                 | Example Conferences                                                |
| -------------------- | ------------------------------------------------------------------ |
| Architecture/Systems | ASPLOS · ISCA · MICRO · OSDI · SOSP · FAST · NSDI · EuroSys |
| Networks             | SIGCOMM · INFOCOM · MobiCom · SenSys · MobiSys                 |
| Security             | CCS · IEEE S&P · USENIX Security · NDSS · CRYPTO               |
| SE/PL                | ICSE · FSE · PLDI · POPL · ASE · ISSTA · CAV                 |
| Databases            | SIGMOD · VLDB · ICDE · KDD · SIGIR · WSDM                     |
| Theory               | STOC · FOCS · LICS · SODA · ICALP                              |
| AI                   | AAAI · NeurIPS · IJCAI · ICML · ICLR · CVPR · ICCV · ACL    |
| Graphics/Multimedia  | SIGGRAPH · ACM MM · IEEE VIS · ECCV                             |
| HCI                  | CHI · UbiComp · UIST · CSCW                                     |

Approximately 40 CCF A, 60 CCF B, and 60 CCF C entries, totaling **160+** entries.

---

## Requirements

- **Zotero 7.0** or higher (Zotero 6 is not supported).

---

## License

MIT
