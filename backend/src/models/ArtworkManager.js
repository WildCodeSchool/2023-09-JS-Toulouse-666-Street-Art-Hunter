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
      date_published: datePublished,
      ask_to_archived: askToArchived,
      is_archived: isArchived,
      is_validate: isValidate,
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
      date_published: datePublished,
      ask_to_archived: askToArchived,
      is_archived: isArchived,
      is_validate: isValidate,
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

  // ------------------ ------------------
  async countArtworkNoValidate() {
    const [rows] = await this.database.query(
      `SELECT COUNT(*) AS numberOfArtwork FROM ${this.table} WHERE is_validate='0'`
    );
    return rows;
  }

  // ------------------ ------------------
  async readAllToAdd() {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE is_validate='0'`
    );
    return rows;
  }

  // ------------------ ------------------
  async readAllToMissing() {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE ask_to_archived='1'`
    );
    return rows;
  }

  // ------------------ Méthode GET BY ID ------------------
  async readArtworkAndUser(id) {
    const [rows] = await this.database.query(
      `SELECT ${this.table}.*, user.name FROM ${this.table} INNER JOIN user ON ${this.table}.publisher_id = user.id WHERE ${this.table}.id = ?`,
      [id]
    );
    return rows[0];
  }
}

module.exports = ArtworkManager;
