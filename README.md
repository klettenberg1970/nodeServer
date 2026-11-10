# nodeServer

Ein modularer **Node.js- / Express-Backend-Server** (ES-Module) mit MongoDB-Anbindung, REST-APIs, CLI-Hilfsskripten sowie MCP-Integration.

---

## 🚀 Überblick & Hauptfeatures

Der Server stellt REST-Endpunkte für verschiedene Daten- und Drittanbieter-Dienste bereit:

- **Portfolio & Börsenkurse (`/api/v1/portfolio`, `/api/v1/kurse`):** Verwaltung von Finanz-Assets und Abruf von Marktdaten via `yahoo-finance2`.
- **Google Services (`/api/googledoc`, `/api/v1/googledoc`):** Integration von Google Drive und Google Docs (`googleapis`).
- **Gemini KI (`/api/gemini`):** Einbindung von Google Generative AI (`@google/generative-ai`).
- **Obsidian & Notizen (`/api/obsidian`, `/api/v1/links`):** Obsidian-Dateiverwaltung, Markdown-Verarbeitung und strukturierte Linksammlungen.
- **RSS-Feeds (`/api/v1/rss`):** Parsen und Verwalten von News-Feeds (`rss-parser`).
- **Benutzer & Sicherheit (`/api/passwort`, `/api/v1/passwoerter`):** Authentifizierung via `jsonwebtoken` und Passwortverwaltung.
- **Weitere APIs:** Kontakte (`/api/kontakte`), Quiz (`/api/quiz`), Umfragen (`/api/umfragen`), Fotos (`/api/fotos`) und Wikipedia-Abfragen (`/api/wikipedia`).

---

## 📁 Ordnerstruktur

- **`server.js`**: Haupteinstiegspunkt der Anwendung (Express-App, Middleware, Serverstart).
- **`src/`**:
  - `config/`: Datenbankverbindung (MongoDB via `mongoose`).
  - `controllers/`: Controller-Logik der Endpunkte (z. B. Gemini, Portfolio, Kontakte, Google Docs).
  - `models/`: Mongoose-Schemas und Datenmodelle.
  - `routes/`: Express-Router-Definitionen (gebündelt in `indexRouter.js`).
  - `middleware/`: Error-Handling, CORS, Helmet, Kompression und Logging.
  - `utils/`: Hilfsklassen (u. a. Yahoo Finance, Google Drive API).
- **`skripts/`**: Eigenständige Node.js-Hilfsskripte (CLI-Tools für Datenmigration, MongoDB-Wartung, Passwortverwaltung, RSS- und Obsidian-Imports).
- **`docs/`**: Projektdokumentationen und Spickzettel (CLI, Docker, Git, APIs).

---

## 🧩 MCP-Unterstützung (Model Context Protocol)

Das Projekt unterstützt **MCP**-Tools über das `@modelcontextprotocol/sdk` und die Antigravity-CLI. Damit können MCP-Clients direkt auf Dateisystem- und Obsidian-Funktionen zugreifen:

### Verfügbare MCP-Server & Tools

- **node-lokal** (Dateisystem-Operationen)
  - `liste_Dateien_und_Ordner`
  - `erstelle_Ordner`
  - `erstelle_Datei`
  - `lese_Datei`
  - `veraendere_Datei`
  - `lösche Datei oder Ordner`
  - `Notiz erstellen`

- **nodeServer** (Obsidian- und Link-Verwaltung)
  - `listeObsidianDateien`
  - `leseMdDatei`
  - `leseMdDateiByName`
  - `erstelleMd`
  - `ergaenzeMd`
  - `updateMd`
  - `holeLinks`
  - `erstelleLink`
  - `loescheLink`
  - `loescheLinkNachName`
  - `verschiebeLink`
  - `benenneLinkUm`
  - `Notiz erstellen`

### Beispielaufruf via Antigravity-CLI

```bash
agy mcp call --server node-lokal --tool erstelle_Ordner --args '{"Pfad":"./neuerOrdner"}'
```

---

## 🛠️ Installation & Start

### Voraussetzungen
- Node.js (Version >= 18 empfohlen)
- MongoDB-Instanz (lokal oder MongoDB Atlas)
- Konfigurierte `.env`-Datei (u. a. `PORT`, `MONGO_URI`, API-Keys)

### Befehle

```bash
# Abhängigkeiten installieren
npm install

# Server im Produktionsmodus starten
npm start

# Server im Entwicklungsmodus (mit Nodemon) starten
npm run dev
```

### Docker (optional)

```bash
docker-compose up -d
```
