const AbstractManager = require("./AbstractManager");

class ArtworkManager extends AbstractManager {
  constructor() {
    super({ table: "artwork" });
  }

  // --------- CRUD ---------

  // ------------------ Méthode POST ------------------
  async create(artwork) {
    const {
      image,
      longitude,
      latitude,
      adress,
      description,
      datePublished,
      askToArchived,
      isArchived,
      isValidate,
    } = artwork;

    const [rows] = await this.database.query(
      `INSERT INTO ${this.table} (image, longitude, latitude, adress, description, date_published, ask_to_archived, is_archived, is_validate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        image,
        longitude,
        latitude,
        adress,
        description,
        datePublished,
        askToArchived,
        isArchived,
        isValidate,
      ]
    );

    return rows.insertId;
  }

  // ------------------ Méthode PUT ------------------
  async update(id, artwork) {
    const {
      image,
      longitude,
      latitude,
      adress,
      description,
      datePublished,
      askToArchived,
      isArchived,
      isValidate,
    } = artwork;

    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET image = ?, longitude = ?, latitude = ?, adress = ?, description = ?, date_published = ?, ask_to_archived = ?, is_archived = ?, is_validate = ? WHERE id = ?`,
      [
        image,
        longitude,
        latitude,
        adress,
        description,
        datePublished,
        askToArchived,
        isArchived,
        isValidate,
        id,
      ]
    );
    return rows;
  }
}

module.exports = ArtworkManager;
