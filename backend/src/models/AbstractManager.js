// Import database client
const database = require("../../database/client");

// Provide database access through AbstractManager class
class AbstractManager {
  constructor({ table }) {
    // Store the table name
    this.table = table;

    // Provide access to the database client
    this.database = database;
  }

  // ------------------ Méthode GET BY ID ------------------
  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  // ------------------ Méthode GET ------------------
  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async countAll() {
    const [rows] = await this.database.query(
      `SELECT COUNT(*) AS numberOfUser FROM ${this.table}`
    );
    return rows;
  }

  // ------------------ Méthode DELETE ------------------
  async delete(id) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows;
  }
}

// Ready to export
module.exports = AbstractManager;
