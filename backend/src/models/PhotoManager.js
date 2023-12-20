const AbstractManager = require("./AbstractManager");

class PhotoManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "photo" as configuration
    super({ table: "photo" });
  }

  // The C of CRUD - Create operation

  async create(photo) {
    // Execute the SQL INSERT query to add a new photo to the "photo" table
    const [result] = await this.database.query(
      `insert into ${this.table} (image, is_validated, user_id, artwork_id) values (?, ?, ?, ?)`,
      [photo.image, photo.is_validated, photo.user_id, photo.artwork_id]
    );

    // Return the ID of the newly inserted photo
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific photo by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the photo
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all photos from the "photo" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of photos
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing photo

  async update(id, photo) {
    // Execute the SQL SELECT query to update on photo from the "photo" table
    const [rows] = await this.database.query(
      `update ${this.table} set image = ?, is_validated = ?, user_id = ?, artwork_id = ? where id = ?`,
      [photo.image, photo.is_validated, photo.user_id, photo.artwork_id, id]
    );
    return rows;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an photo by its ID

  async delete(id) {
    const [rows] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return rows;
  }
}

module.exports = PhotoManager;
