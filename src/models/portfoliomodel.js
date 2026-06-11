import mongoose from 'mongoose';

const FinanzenDb = mongoose.connection.useDb('Finanzen');

// 1. Das Schema für eine einzelne Aktien/ETF-Position
const positionSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true
  },
  Y_finance_code: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  // Als String definiert, um verschlüsselten Text aufzunehmen
  Anzahl: {
    type: String, 
    required: true
  },
  // Als String definiert, um verschlüsselten Text aufzunehmen
  Einstandswert: {
    type: String,
    required: true
  }
});

// 2. Das Haupt-Schema für das gesamte Portfolio
const portfolioSchema = new mongoose.Schema({
  // Ein Array von Positionen
  positions: [positionSchema],
  
  // Der Bargeldbestand (ebenfalls als String für Verschlüsselung)
  cash: {
    type: String,
    default: "0" 
  },
  
}, {
  collection: 'portfolio',
  versionKey: false,
});

// Korrektur: Hier fehlte FinanzenDb
export default FinanzenDb.model('Portfolio', portfolioSchema);
