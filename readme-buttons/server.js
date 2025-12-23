// server.js
import express from 'express';
import handler from './api/index.js';

const app = express();

app.get('/api/button', (req, res) => {
  // Mock the Vercel req/res objects
  handler(req, res);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/api/button');
});