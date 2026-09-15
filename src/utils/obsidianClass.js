
const LOCAL_API = 'http://localhost:8080';
const CLOUD_API = 'https://nodeserver-995188789852.europe-west3.run.app';

export class Obsidian {
  constructor() {
    // Testet einmalig beim Erstellen, ob der lokale Server erreichbar ist,
    // und merkt sich das Ergebnis für alle weiteren Aufrufe.
    this.apiPromise = this.#erkenneAPI();
  }

  async #erkenneAPI() {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 800);
      // Irgendein leichter Endpunkt reicht - uns interessiert nur,
      // ob der Server überhaupt antwortet (auch ein 404 zählt als "erreichbar").
      await fetch(`${LOCAL_API}/api/v1/obsidian/ordnername/ping`, { signal: controller.signal });
      clearTimeout(timeout);
      return LOCAL_API;
    } catch {
      return CLOUD_API;
    }
  }

  async getKompletteDateien(id) {
    const API = await this.apiPromise;
    const response = await fetch(`${API}/api/v1/obsidian/komplett/${id}`);
    const daten = await response.json();
    return daten;
  }

  async getOrdnerIdByName(name) {
    const API = await this.apiPromise;
    const response = await fetch(`${API}/api/v1/obsidian/ordnername/${name}`);
    const daten = await response.json();
    return daten;
  }

  async getDatenByOrdnerID(id) {
    const API = await this.apiPromise;
    const res = await fetch(`${API}/api/obsidian/dateien/${id}`);
    const daten = await res.json();
    return daten;
  }

  async getMdByID(id) {
    const API = await this.apiPromise;
    const res = await fetch(`${API}/api/obsidian/datei/${id}`);
    const daten = await res.json();
    return daten;
  }

  async updateMdDatei(text, id) {
    const API = await this.apiPromise;

    const response = await fetch(`${API}/api/v1/obsidian/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text, id: id })
    });

    const data = await response.json();
    return data
  }


  async createNewMdDatei(id,name ,text) {
    const API = await this.apiPromise;

    const response = await fetch(`${API}/api/v1/obsidian/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  id: id ,name: name, text: text})
    });

    const data = await response.json();
    return data
  }

}