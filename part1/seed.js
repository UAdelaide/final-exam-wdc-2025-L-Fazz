module.exports = async function seed(pool) {
  try {
    console.log("Running seed.js...");

    // Clear tables
    await pool.query('DELETE FROM WalkRatings');
    await pool.query('DELETE FROM WalkApplications');
    await pool.query('DELETE FROM WalkRequests');
    await pool.query('DELETE FROM Dogs');
    await pool.query('DELETE FROM Users');

    // Insert users
    await pool.query(`
      INSERT INTO Users (username, email, password_hash, role)
      VALUES
        ('alice123', 'alice@example.com', 'hashed123', 'owner'),
        ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
        ('carol123', 'carol@example.com', 'hashed789', 'owner'),
        ('daveyD', 'dave@example.com', 'hashedabc', 'walker'),
        ('jacko', 'jack@example.com', 'hashedxyz', 'owner');
    `);

    // Insert dogs
    await pool.query(`
      INSERT INTO Dogs (owner_id, name, size)
      VALUES
        ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
        ((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small'),
        ((SELECT user_id FROM Users WHERE username = 'jacko'), 'Poppy', 'large'),
        ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Enzo', 'medium'),
        ((SELECT user_id FROM Users WHERE username = 'carol123'), 'Rocky', 'medium');
    `);

    // Insert walk requests
    await pool.query(`
      INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
      VALUES
        (
          (SELECT dog_id FROM Dogs WHERE name = 'Max'),
          '2025-06-10 08:00:00',
          30,
          'Parklands',
          'open'
        ),
        (
          (SELECT dog_id FROM Dogs WHERE name = 'Bella'),
          '2025-06-10 09:30:00',
          45,
          'Beachside Ave',
          'accepted'
        ),
        (
          (SELECT dog_id FROM Dogs WHERE name = 'Poppy'),
          '2025-06-11 10:00:00',
          60,
          'Parklands',
          'open'
        ),
        (
          (SELECT dog_id FROM Dogs WHERE name = 'Enzo'),
          '2025-06-12 16:00:00',
          20,
          'Botanic Loop',
          'open'
        ),
        (
          (SELECT dog_id FROM Dogs WHERE name = 'Rocky'),
          '2025-06-13 07:30:00',
          40,
          'River Trail',
          'open'
        );
    `);

    // Confirm data was inserted
    const [rows] = await pool.query("SELECT * FROM Users");
    console.log("👀 Current users in DB:", rows);

    console.log("Seed data inserted.");
  } catch (err) {
    console.error("Seed failed:", err);
  }
};
