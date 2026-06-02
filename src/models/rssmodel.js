import mongoose from 'mongoose';

// Definiere das Schema für die RSS-Feeds
const rssSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Entfernt Leerzeichen am Anfang/Ende
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Fügt `createdAt` und `updatedAt` hinzu
    collection: 'rss', // Name der Collection in MongoDB
  }
);

// Exportiere das Modell
export default mongoose.model('RSS', rssSchema);
