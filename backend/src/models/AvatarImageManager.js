const AbstractManager = require("./AbstractManager");

class AvatarImageManager extends AbstractManager {
  constructor() {
    super({ table: "avatar_image" });
  }

  // ------------------ Méthode GET ------------------
  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  // ------------------ Méthode GET BY ID ------------------
  async read(id) {
    const parseId = parseInt(id, 10);
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [parseId]
    );
    return rows[0];
  }

  // ------------------ Méthode POST ------------------
  async create(avatarImage) {
    const { name, objective, imgUrl } = avatarImage;

    const [rows] = await this.database.query(
      `INSERT INTO ${this.table} (name, objective, img_url) VALUES (?, ?, ?)`,
      [name, objective, imgUrl]
    );

    return rows.insertId;
  }

  // ------------------ Méthode PUT ------------------
  async update(id, avatarImage) {
    const { name, objective, imgUrl } = avatarImage;

    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, objective = ?, img_url = ?  WHERE id = ?`,
      [name, objective, imgUrl, id]
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

module.exports = AvatarImageManager;
