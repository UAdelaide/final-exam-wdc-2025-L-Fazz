// app.js
console.log("Running seed.js");
const express = require('express');
const pool = require('./db');
const seed = require('./seed');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', apiRoutes);

// Seed data on startup
seed(pool);

app.listen(PORT, () => {
    console.log("Seeding complete");
  console.log(`Server running at http://localhost:${PORT}`);

const [rows] = await pool.query("SELECT * FROM Users");
console.log("👀 Current users in DB:", rows);

});
