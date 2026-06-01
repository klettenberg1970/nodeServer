Docker Grundlagen: Images, Container und Volumes - Eine vollständige Übersicht
Was ist ein Docker Image?
Ein Docker Image ist eine schreibgeschützte Vorlage, die alles enthält, was Ihre Anwendung zum Laufen braucht. Stellen Sie es sich wie eine ISO-Datei vor. Ihr Passwortmanager-Image enthält ein leichtgewichtiges Linux-Betriebssystem, die Node.js-Laufzeitumgebung Ihren gesamten Anwendungscode, alle installierten Abhängigkeiten (wie Express, Mongoose und dotenv) sowie die Konfigurationsdateien. Ein solches Image ist mit etwa 380 Megabyte erstaunlich kompakt – viel kleiner als eine vollständige virtuelle Maschine.

Docker Container und Volumes verstehen
Ein Docker Container ist die laufende Instanz eines Images. Während das Image nur die Vorlage ist, wird der Container tatsächlich ausgeführt. Er ist beschreibbar und enthält zur Laufzeit Prozesse wie Ihren Node-Server oder nodemon. Der Container selbst ist mit etwa 49 Kilobyte sehr klein – das ist im Wesentlichen nur Verwaltungsinformationen.

Volumes hingegen sind dafür da, Daten dauerhaft zu speichern. Wenn Sie lokales MongoDB verwenden, landen hier Ihre Passwörter. Da Sie jedoch MongoDB Atlas in der Cloud nutzen, sind Ihre Volumes tatsächlich leer oder enthalten nur alte Testdaten. Das ist wichtig zu verstehen: Ihre echten Passwörter werden in der Cloud gespeichert, nicht lokal auf Ihrer Festplatte.

Die wichtigsten Befehle im Überblick
Systeminformationen anzeigen:

bash
docker system df
Dieser Befehl zeigt Ihnen, wie viel Speicherplatz Ihre Images, Container, Volumes und der Build-Cache belegen. Er gibt Ihnen eine großartige Übersicht über den Ressourcenverbrauch von Docker.

Images und Container untersuchen:

bash
docker images                           # Zeigt alle lokalen Images
docker ps                               # Zeigt laufende Container
docker ps -a                            # Zeigt alle Container (auch gestoppte)
docker compose exec app sh              # Öffnet eine Shell im laufenden Container
Container steuern:

bash
docker compose up                       # Startet Container (Vordergrund)
docker compose up -d                    # Startet Container im Hintergrund
docker compose down                     # Stoppt und löscht Container
docker compose down -v                  # Löscht auch die Volumes (Vorsicht!)
docker compose start                    # Startet existierende Container (manchmal problematisch)
docker compose stop                     # Stoppt Container
docker compose restart app              # Startet nur die App neu
Logs und Fehlersuche:

bash
docker compose logs                     # Zeigt alle Logs
docker compose logs app                 # Nur Logs der App
docker compose logs --tail=50 app       # Letzte 50 Zeilen
docker compose logs -f                  # Logs live verfolgen
Aufräumen und Speicher freigeben:

bash
docker builder prune                    # Löscht Build-Cache (sicher)
docker volume prune                     # Löscht unbenutzte Volumes
docker volume prune -f                  # Löscht ohne Nachfrage
docker system prune -a                  # Löscht alles Unbenutzte (komplett)
Wenn ein Container hängt oder nicht reagiert
Manchmal passiert es, dass Sie in einer Shell innerhalb eines Containers stecken und nicht mehr herauskommen. Die einfachste Lösung ist dann, einfach exit zu tippen und Enter zu drücken. Falls das nicht funktioniert, hilft oft die Tastenkombination STRG + D. In hartnäckigen Fällen können Sie auch mehrfach STRG + C drücken oder ein neues Terminal öffnen und dort docker compose down ausführen, um den Container komplett zu stoppen.

Typische Probleme und ihre Lösungen
Das Problem mit docker compose start: Nach einem STRG + C kann docker compose start manchmal dazu führen, dass nodemon nicht richtig arbeitet. Die zuverlässigere Methode ist immer docker compose up – das baut zwar nicht neu, startet aber sauberer.

Verbindungsprobleme zu MongoDB Atlas: Die häufigste Ursache ist eine geänderte IP-Adresse. Da Ihre Passwörter in der Cloud gespeichert sind, müssen Sie bei jedem Wechsel des Internetzugangs (oder bei VPN) Ihre aktuelle IP in MongoDB Atlas freigeben. Gehen Sie dazu in der Atlas-Oberfläche zu Network Access und fügen Sie entweder Ihre neue IP hinzu oder erlauben Sie pauschal den Zugriff von überall mit 0.0.0.0/0.

Ungenutzte Volumes aufräumen: Wenn Sie, wie in Ihrem Fall, MongoDB Atlas verwenden, brauchen Sie die lokalen Volumes nicht. Sie können bedenkenlos docker volume prune ausführen – Ihre echten Passwörter in der Cloud bleiben davon völlig unberührt.

Best Practices für den Arbeitsalltag
Starten Sie Ihre Entwicklungsumgebung immer mit docker compose up – das ist der zuverlässigste Befehl. Wenn Sie die Container für längere Zeit nicht brauchen, reicht ein einfaches STRG + C zum Stoppen. Vor dem Herunterfahren des Computers können Sie docker compose down ausführen, um alles sauber zu entfernen. Für den nächsten Start genügt dann wieder docker compose up.

Wenn Sie Änderungen an der package.json vornehmen, müssen Sie einmalig docker compose build --no-cache ausführen, damit die neuen Abhängigkeiten installiert werden. Bei reinen Code-Änderungen reicht dagegen ein einfaches docker compose restart app, da nodemon die Änderungen automatisch erkennt.

Zusammenfassung
Docker mag auf den ersten Blick komplex erscheinen, aber mit diesen Grundbefehlen können Sie Ihren Passwortmanager problemlos betreiben. Die wichtigste Erkenntnis: Images sind Vorlagen, Container sind laufende Instanzen, und Volumes sind für Daten da. Da Sie MongoDB Atlas verwenden, sind Ihre echten Daten in der Cloud sicher, und Sie können lokale Volumes getrost löschen, wenn Sie Platz brauchen. Bei Problemen helfen die Logs (docker compose logs) fast immer weiter, um die Ursache zu finden.

This response is AI-generated, for reference only