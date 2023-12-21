const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, description, email, password, score, is_admin, is_banned, selected_avatar, border) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.name,
        user.description,
        user.email,
        user.password,
        user.score,
        user.is_admin,
        user.is_banned,
        user.selected_avatar,
        user.border,
      ]
    );
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  // The U of CRUD - Update operation

  async update(id, user) {
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, description = ?, email = ?, password = ?, score = ?, is_admin = ?, is_banned = ?, selected_avatar = ?, border = ? WHERE id = ?`,
      [
        user.name,
        user.description,
        user.email,
        user.password,
        user.score,
        user.is_admin,
        user.is_banned,
        user.selected_avatar,
        user.border,
        id,
      ]
    );
    return rows;
  }

  // The D of CRUD - Delete operation
}

module.exports = UserManager;
