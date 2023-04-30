const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("users.db");

export function createTable() {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)"
  );
}

export function register(username, password) {
  db.run(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    [username, password],
    function (err) {
      if (err) {
        console.log(err.message);
        return res.status(400).json({ error: "Could not register user" });
      }
    }
  );
}

export async function login(username, password) {
  return db.get(
    `SELECT * FROM users WHERE username = ? AND password = ?`,
    [username, password],
    function (err, row) {
      if (err) {
        console.log(err.message);
        return err.message;
      }
      if (!row) {
        return { error: "Invalid username or password" };
      }
      console.log(`User logged in: ${username}`);
    }
  );
}
