// server.js
import express from 'express';
import handler from './api/index.js';

const app = express();

// --- FIX: Change '/api/button' to '/api/index' ---
app.get('/api/index', (req, res) => {
  handler(req, res);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}/api/index`);
});