import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health-Check Route
app.get('/api/v1/status', (req, res) => {
  res.json({ status: 'Server läuft ✅' });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});