# Docker Setup – Zusammenfassung

## Das große Bild

```
Windows 11
├── VS Code              ← Editor, läuft als Windows-App
└── WSL (Windows Subsystem for Linux)
    └── Ubuntu           ← echtes Linux-System
        └── Docker       ← läuft hier, braucht Linux
            ├── Container 1 (z.B. Backend)
            └── Container 2 (z.B. Frontend)
```

---

## Was ist was?

| Tool | Rolle | Warum nötig? |
|---|---|---|
| **Windows 11** | dein Betriebssystem | - |
| **WSL** | macht Linux auf Windows möglich | Docker braucht Linux |
| **Ubuntu** | das Linux-System in WSL | hier läuft Docker |
| **Docker** | startet und verwaltet Container | isolierte Umgebungen |
| **VS Code** | Editor, verbunden mit Ubuntu | Dateien bearbeiten |

---

## Warum nicht Docker Desktop?

Docker Desktop 4.31.0 hatte auf Windows 11 24H2 einen bekannten Bug –
der Socket-Forwarder startete nie, Docker blieb dauerhaft bei
„Starting the Engine" hängen.

**Lösung:** Docker direkt in Ubuntu (WSL) installieren – umgeht den Bug
komplett und ist sogar schneller.

---

## Was wurde installiert?

### Docker in Ubuntu
```bash
# Docker läuft als Dienst in Ubuntu
sudo service docker start

# Autostart beim Öffnen von Ubuntu (in ~/.bashrc eingetragen)
if ! service docker status > /dev/null 2>&1; then sudo service docker start; fi
```

### VS Code Extensions
- **WSL** (`ms-vscode-remote.remote-wsl`) – verbindet VS Code mit Ubuntu
- **Dev Containers** (`ms-vscode-remote.remote-containers`) – für Container-Entwicklung

---

## Wo liegen die Dateien?

Projekte liegen im **WSL-Dateisystem**, nicht auf C:\

```
Ubuntu:   /home/user/projekte/docker-test
Windows:  Linux → Ubuntu → home → user → projekte → docker-test
```

Dateien im WSL-Dateisystem sind deutlich schneller mit Docker
als Dateien auf C:\ (über /mnt/c/).

---

## Täglicher Ablauf

### VS Code starten
```bash
# Ubuntu öffnen, dann:
cd ~/projekte/docker-test
code .
```

Oder in VS Code: unten links `><` → „Connect to WSL" →
zuletzt geöffnete Ordner.

### Docker starten
Docker startet automatisch wenn Ubuntu geöffnet wird
(dank Eintrag in ~/.bashrc).

Prüfen ob Docker läuft:
```bash
docker ps
```

### Projekt starten
```bash
cd ~/projekte/docker-test
docker compose up --build   # beim ersten Mal oder nach Änderungen
docker compose up           # sonst
```

### Beenden
```
Strg+C   → Container stoppen
```
oder
```bash
docker compose down   → Container stoppen und löschen
```

---

## Docker Grundkonzepte

### Image vs. Container

| | Erklärung | Analogie |
|---|---|---|
| **Image** | Bauplan, unveränderlich | Klasse / Rezept |
| **Container** | laufende Instanz des Images | Objekt / gekochtes Gericht |

```
Dockerfile → docker build → Image → docker run → Container
(Rezept)                   (Gericht)              (gegessen)
```

### Dockerfile
Beschreibt wie ein Image gebaut wird:
```dockerfile
FROM node:20          # Basis-Image
WORKDIR /app          # Arbeitsverzeichnis im Container
COPY . .              # Dateien reinkopieren
RUN npm install       # Abhängigkeiten installieren
CMD ["node", "server.js"]  # App starten
```

### docker-compose.yml
Beschreibt welche Container gestartet werden:
```yaml
services:
  server:
    build: ./server
    ports:
      - "3000:3000"
```

Dann alles starten mit: `docker compose up`

---

## Projektstruktur docker-test

```
~/projekte/docker-test/
└── server/
    ├── server.js          ← Express-Server
    ├── package.json       ← Node.js Projektdatei
    ├── Dockerfile         ← Bauplan für den Container
    └── docker-compose.yml ← startet den Container
```

---

## Nützliche Terminal-Befehle

```bash
pwd          # zeigt aktuellen Pfad
ls           # zeigt Inhalt des Ordners
cd server    # in Ordner wechseln
cd ..        # eine Ebene hoch
cd ../..     # zwei Ebenen hoch
```