# node-server

Ein modularer **Node.js- / Express-Backend-Server** (ES-Module) mit MongoDB-Anbindung, REST-APIs und diversen CLI-Hilfsskripten.

---

## 🧩 MCP-Unterstützung

Der Server unterstützt jetzt **MCP (Modular Command Protocol)**‑Tools, die über das Antigravity‑CLI bereitgestellt werden. Mit den folgenden MCP‑Servern und ihren lazily‑geladenen Werkzeugen können Sie Dateien und Ordner im Projekt verwalten, Obsidian‑Markdown‑Dateien lesen und schreiben sowie weitere automatisierte Aktionen ausführen.

### Verfügbare MCP‑Server

- **node-lokal** (Dateisystem‑Operationen)
  - `liste_Dateien_und_Ordner`
  - `erstelle_Ordner`
  - `erstelle_Datei`
  - `lese_Datei`
  - `veraendere_Datei`
  - `loesche`
- **nodeServer** (Obsidian‑ und MD‑Manipulation)
  - `listeObsidianDateien`
  - `leseMdDatei`
  - `leseMdDateiByName`
  - `erstelleMd`
  - `ergaenzeMd`
  - `updateMd`
  - `holeLinks`
  - `erstelleLink`

### Beispielaufruf via Antigravity‑CLI

```bash
agy mcp call --server node-lokal --tool erstelle_Ordner --args '{"Pfad":"./neuerOrdner"}'
```

Damit wird im Arbeitsverzeichnis ein neuer Ordner angelegt.

Weitere Informationen finden Sie in den jeweiligen Tool‑Schemas unter `~/.gemini/antigravity-cli/mcp/<server>/`.

---

## 🚀 Überblick & Funktionen

Der Server stellt REST-Endpunkte für verschiedene Daten- und Drittanbieter-Dienste bereit:

- **Portfolio & Kurse (`/api/v1/portfolio`, `/api/v1/kurse`):** Verwaltung von Finanz-Assets und Abruf von Marktdaten via `yahoo-finance2`.
- **Google Services (`/api/googledoc`, `/api/v1/googledoc`):** Integration von Google Drive und Google Docs (`googleapis`).
- **Gemini KI (`/api/gemini`):** Integration der Google Generative AI Schnittstelle (`@google/generative-ai`).
- **RSS-Feeds (`/api/v1/rss`):** Parsen und Verwalten von News-Feeds (`rss-parser`).
- **Notizen & Links (`/api/obsidian`, `/api/v1/links`):** Obsidian-Integration und strukturierte Linksammlungen.
- **Benutzer & Sicherheit (`/api/passwort`, `/api/v1/passwoerter`):** Passwort-Management und Authentifizierung (`jsonwebtoken`).
- **Weitere APIs:** Kontakte (`/api/kontakte`), Quiz (`/api/quiz`), Umfragen (`/api/umfragen`), Fotos (`/api/fotos`) und Wikipedia-Abfragen (`/api/wikipedia`).

---

## 🧩 MCP-Unterstützung

Der Server unterstützt jetzt **MCP (Modular Command Protocol)**‑Tools, die über das Antigravity‑CLI bereitgestellt werden. Mit den folgenden MCP‑Servern und ihren lazily‑geladenen Werkzeugen können Sie Dateien und Ordner im Projekt verwalten, Obsidian‑Markdown‑Dateien lesen und schreiben sowie weitere automatisierte Aktionen ausführen.

### Verfügbare MCP‑Server

- **node-lokal** (Dateisystem‑Operationen)
  - `liste_Dateien_und_Ordner`
  - `erstelle_Ordner`
  - `erstelle_Datei`
  - `lese_Datei`
  - `veraendere_Datei`
  - `loesche`
- **nodeServer** (Obsidian‑ und MD‑Manipulation)
  - `listeObsidianDateien`
  - `leseMdDatei`
  - `leseMdDateiByName`
  - `erstelleMd`
  - `ergaenzeMd`
  - `updateMd`
  - `holeLinks`
  - `erstelleLink`

### Beispielaufruf via Antigravity‑CLI

```bash
agy mcp call --server node-lokal --tool erstelle_Ordner --args '{"Pfad":"./neuerOrdner"}'
```

Damit wird im Arbeitsverzeichnis ein neuer Ordner angelegt.

Weitere Informationen finden Sie in den jeweiligen Tool‑Schemas unter `~/.gemini/antigravity-cli/mcp/<server>/`.

---

## 📁 Ordnerstruktur

- **`server.js`**: Haupteinstiegspunkt der Anwendung (Express-App, Middleware, Serverstart).
- **`src/`**:
  - `config/`: Datenbank-Konfiguration (MongoDB-Verbindung via `mongoose`).
  - `controllers/`: Logik für die einzelnen Anwendungsbereiche (z. B. Gemini, Portfolio, Kontakte, Google Docs).
  - `models/`: Mongoose-Schemas und Datenmodelle.
  - `routes/`: Express-Router-Definitionen (zusammengeführt in `indexRouter.js`).
  - `middleware/`: Error-Handling, CORS-Konfiguration, Helmet, Kompression und Logging.
  - `utils/`: Hilfsklassen (u. a. Yahoo Finance, Google Drive API).
- **`skripts/`**: Eigenständige Node.js-Hilfsskripte (CLI-Tools für Datenmigration, MongoDB-Wartung, Passwortverwaltung, RSS-, Obsidian- und Quiz-Imports).
- **`docs/`**: Dokumentationen, Spickzettel (CLI, Docker, Git, APIs) und Anmeldedaten.

---

## 🧩 MCP-Unterstützung

Der Server unterstützt jetzt **MCP (Modular Command Protocol)**‑Tools, die über das Antigravity‑CLI bereitgestellt werden. Mit den folgenden MCP‑Servern und ihren lazily‑geladenen Werkzeugen können Sie Dateien und Ordner im Projekt verwalten, Obsidian‑Markdown‑Dateien lesen und schreiben sowie weitere automatisierte Aktionen ausführen.

### Verfügbare MCP‑Server

- **node-lokal** (Dateisystem‑Operationen)
  - `liste_Dateien_und_Ordner`
  - `erstelle_Ordner`
  - `erstelle_Datei`
  - `lese_Datei`
  - `veraendere_Datei`
  - `loesche`
- **nodeServer** (Obsidian‑ und MD‑Manipulation)
  - `listeObsidianDateien`
  - `leseMdDatei`
  - `leseMdDateiByName`
  - `erstelleMd`
  - `ergaenzeMd`
  - `updateMd`
  - `holeLinks`
  - `erstelleLink`

### Beispielaufruf via Antigravity‑CLI

```bash
agy mcp call --server node-lokal --tool erstelle_Ordner --args '{"Pfad":"./neuerOrdner"}'
```

Damit wird im Arbeitsverzeichnis ein neuer Ordner angelegt.

Weitere Informationen finden Sie in den jeweiligen Tool‑Schemas unter `~/.gemini/antigravity-cli/mcp/<server>/`.

---

## 🛠️ Installation & Start

### Voraussetzungen
- Node.js (Version >= 18 empfohlen)
- MongoDB Instanz (lokal oder Atlas)
- Umgebungsvariablen in der `.env`-Datei konfiguriert (u. a. `PORT`, `MONGO_URI`, API-Keys)

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
