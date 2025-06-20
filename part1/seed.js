// seed.js
module.exports = async function seed(pool) {
  try {
    // optional: clear tables
    await pool.query('DELETE FROM WalkRatings');
    await pool.query('DELETE FROM WalkApplications');
    await pool.query('DELETE FROM WalkRequests');
    await pool.query('DELETE FROM Dogs');
    await pool.query('DELETE FROM Users');

    // insert users
    await pool.query(`
      INSERT INTO Users (username, email, password_hash, role) VALUES
      ('alice123', 'alice@example.com', 'hashed123', 'owner'),
      ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
      ('carol123', 'carol@example.com', 'hashed789', 'owner'),
      ('daveyD', 'dave@example.com', 'hashedabc', 'walker'),
      ('emmacat', 'emma@example.com', 'hashedxyz', 'owner');
    `);

    // insert dogs
    await pool.query(`
      INSERT INTO Dogs (owner_id, name, size) VALUES
      ((SELECT user_id FROM Users WHERE username='alice123'), 'Max', 'medium'),
      ((SELECT user_id FROM Users WHERE username='carol123'), 'Bella', 'small');
    `);

    // insert walk requests
    await pool.query(`
      INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
      ((SELECT dog_id FROM Dogs WHERE name='Max'), '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
      ((SELECT dog_id FROM Dogs WHERE name='Bella'), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted');
    `);

    // insert walk ratings
    await pool.query(`
      INSERT INTO WalkRatings (request_id, walker_id, owner_id, rating, comments) VALUES
      (2, (SELECT user_id FROM Users WHERE username='bobwalker'), (SELECT user_id FROM Users WHERE username='carol123'), 5, 'Great walk!');
    `);

    console.log("✅ Seed data inserted.");
  } catch (err) {
    console.error("❌ Seed failed:", err);
  }
};
