// app.js
const express = require('express');
const pool = require('./db');
const seed = require('./seed');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);

// Seed data on startup
seed(pool);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
