const AbstractManager = require("./AbstractManager");

class AvatarImageManager extends AbstractManager {
  constructor() {
    super({ table: "avatar_image" });
  }

  // --------- CRUD ---------

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
}

module.exports = AvatarImageManager;
