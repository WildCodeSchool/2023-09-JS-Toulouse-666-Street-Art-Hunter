const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  // --------- CRUD ---------

  // ------------------ Méthode POST ------------------
  async create(user) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const {
      name,
      description,
      email,
      password,
      score,
      is_admin: isAdmin,
      is_banned: isBanned,
      selected_avatar: selectedAvatar,
      border,
    } = user;
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, description, email, password, score, is_admin, is_banned, selected_avatar, border) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        description,
        email,
        password,
        score,
        isAdmin,
        isBanned,
        selectedAvatar,
        border,
      ]
    );
    return result.insertId;
  }

  // ------------------ Méthode PUT ------------------
  async update(id, user) {
    const {
      name,
      description,
      email,
      password,
      score,
      is_admin: isAdmin,
      is_banned: isBanned,
      selected_avatar: selectedAvatar,
      border,
    } = user;
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, description = ?, email = ?, password = ?, score = ?, is_admin = ?, is_banned = ?, selected_avatar = ?, border = ? WHERE id = ?`,
      [
        name,
        description,
        email,
        password,
        score,
        isAdmin,
        isBanned,
        selectedAvatar,
        border,
        id,
      ]
    );
    return rows;
  }
}

module.exports = UserManager;
