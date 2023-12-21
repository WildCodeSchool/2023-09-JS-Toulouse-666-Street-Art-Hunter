const AbstractManager = require("./AbstractManager");

class ArticleManager extends AbstractManager {
  constructor() {
    super({ table: "article" });
  }

  // --------- CRUD ---------

  // ------------------ Méthode POST ------------------
  async create(article) {
    const { title, description, image, isArchived } = article;

    const [rows] = await this.database.query(
      `INSERT INTO ${this.table} (title, description, image, is_archived) VALUES (?, ?, ?, ?)`,
      [title, description, image, isArchived]
    );

    return rows.insertId;
  }

  // ------------------ Méthode PUT ------------------
  async update(id, article) {
    const { title, description, image, isArchived } = article;

    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, description = ?, image = ?, is_archived = ? WHERE id = ?`,
      [title, description, image, isArchived, id]
    );
    return rows;
  }
}

module.exports = ArticleManager;
