const AbstractManager = require("./AbstractManager");

class ArtistManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "artist" as configuration
    super({ table: "artist" });
  }

  // The C of CRUD - Create operation

  async create(artist) {
    // Execute the SQL INSERT query to add a new artist to the "artist" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, description, image) values (?, ?, ?)`,
      [artist.name, artist.description, artist.image]
    );

    // Return the ID of the newly inserted artist
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing artist

  async update(id, artist) {
    // Execute the SQL SELECT query to update on artist from the "artist" table
    const [rows] = await this.database.query(
      `update ${this.table} set name = ?, description = ?, image = ? where id = ?`,
      [artist.name, artist.description, artist.image, id]
    );
    return rows;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an artist by its ID
}

module.exports = ArtistManager;
