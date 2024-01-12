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
      hashed_password: hashedPassword,
      score,
      is_admin: isAdmin,
      is_banned: isBanned,
      selected_avatar: selectedAvatar,
      border,
    } = user;
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, description, email, hashed_password, score, is_admin, is_banned, selected_avatar, border) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        description,
        email,
        hashedPassword,
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
      hashed_password: hashedPassword,
      score,
      is_admin: isAdmin,
      is_banned: isBanned,
      selected_avatar: selectedAvatar,
      border,
    } = user;
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, description = ?, email = ?, hashed_password = ?, score = ?, is_admin = ?, is_banned = ?, selected_avatar = ?, border = ? WHERE id = ?`,
      [
        name,
        description,
        email,
        hashedPassword,
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

  async readByEmail(email) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );

    return rows[0];
  }
}

module.exports = UserManager;
