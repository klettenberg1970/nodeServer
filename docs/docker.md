# Docker – Wichtigste Befehle

## Images

| Befehl | Beschreibung |
|---|---|
| `docker images` | Alle lokal vorhandenen Images anzeigen |
| `docker pull node:20` | Ein Image von Docker Hub herunterladen |
| `docker build -t mein-image .` | Image aus Dockerfile im aktuellen Ordner bauen |
| `docker rmi mein-image` | Ein Image löschen |

---

## Container

| Befehl | Beschreibung |
|---|---|
| `docker ps` | Alle **laufenden** Container anzeigen |
| `docker ps -a` | Alle Container anzeigen (auch gestoppte) |
| `docker run node:20` | Einen Container aus einem Image starten |
| `docker run -p 3000:3000 mein-image` | Container starten und Port freigeben |
| `docker stop <container-id>` | Einen Container stoppen |
| `docker rm <container-id>` | Einen gestoppten Container löschen |
| `docker logs <container-id>` | Logs eines Containers anzeigen |
| `docker exec -it <container-id> bash` | In einen laufenden Container „einsteigen" |

---

## docker compose

| Befehl | Beschreibung |
|---|---|
| `docker compose up` | Alle Services starten |
| `docker compose up --build` | Alle Services neu bauen und starten |
| `docker compose up -d` | Im Hintergrund starten (detached) |
| `docker compose down` | Alle Services stoppen und Container löschen |
| `docker compose logs` | Logs aller Services anzeigen |
| `docker compose logs server` | Logs eines bestimmten Services anzeigen |
| `docker compose ps` | Status aller Services anzeigen |
| `docker compose exec server bash` | In einen laufenden Service einsteigen |

---

## Aufräumen

| Befehl | Beschreibung |
|---|---|
| `docker system prune` | Alle ungenutzten Container, Images, Netzwerke löschen |
| `docker volume prune` | Alle ungenutzten Volumes löschen |

---

## Die wichtigsten Dateien

| Datei | Beschreibung |
|---|---|
| `Dockerfile` | Bauplan für ein Image – wird einmal pro Service angelegt |
| `docker-compose.yml` | Beschreibt alle Services, Ports und wie sie zusammenhängen |
| `.dockerignore` | Dateien die beim Bauen ignoriert werden (wie `.gitignore`) |

---

## Typischer Ablauf

```bash
# 1. Projekt starten
docker compose up --build

# 2. Entwickeln, Dateien ändern...

# 3. Neustart mit neuen Änderungen
docker compose up --build

# 4. Beenden
Strg+C
# oder
docker compose down
```