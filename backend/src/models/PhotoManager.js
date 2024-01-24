const AbstractManager = require("./AbstractManager");

class PhotoManager extends AbstractManager {
  constructor() {
    // Appeler le constructeur de la classe parente (AbstractManager)
    // et passer le nom de la table "photo" comme configuration
    super({ table: "photo" });
  }

  // --------- CRUD ---------

  // ------------------ Méthode POST ------------------
  async create(photo) {
    // Exécuter la requête SQL INSERT pour ajouter une nouvelle photo à la table "photo"
    const [result] = await this.database.query(
      `insert into ${this.table} (image, is_validated, user_id, artwork_id) values (?, ?, ?, ?)`,
      [photo.image, photo.is_validated, photo.user_id, photo.artwork_id]
    );

    // Retourner l'ID de la nouvelle photo insérée
    return result.insertId;
  }

  // ------------------ Méthode PUT ------------------
  async update(id, photo) {
    // Exécuter la requête SQL SELECT pour mettre à jour une photo dans la table "photo"
    const [rows] = await this.database.query(
      `update ${this.table} set image = ?, is_validated = ?, user_id = ?, artwork_id = ? where id = ?`,
      [photo.image, photo.is_validated, photo.user_id, photo.artwork_id, id]
    );
    return rows;
  }

  async readAllToValidate() {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE is_validated='0'`
    );
    return rows;
  }
}

module.exports = PhotoManager;
