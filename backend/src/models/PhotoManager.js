const AbstractManager = require("./AbstractManager");

class PhotoManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "photo" as configuration
    super({ table: "photo" });
  }

  // --------- CRUD ---------

  // ------------------ Méthode POST ------------------
  async create(photo) {
    // Execute the SQL INSERT query to add a new photo to the "photo" table
    const [result] = await this.database.query(
      `insert into ${this.table} (image, is_validated, user_id, artwork_id) values (?, ?, ?, ?)`,
      [photo.image, photo.is_validated, photo.user_id, photo.artwork_id]
    );

    // Return the ID of the newly inserted photo
    return result.insertId;
  }

  // ------------------ Méthode PUT ------------------
  async update(id, photo) {
    // Execute the SQL SELECT query to update on photo from the "photo" table
    const [rows] = await this.database.query(
      `update ${this.table} set image = ?, is_validated = ?, user_id = ?, artwork_id = ? where id = ?`,
      [photo.image, photo.is_validated, photo.user_id, photo.artwork_id, id]
    );
    return rows;
  }
}

module.exports = PhotoManager;
