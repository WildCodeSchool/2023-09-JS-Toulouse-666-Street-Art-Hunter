// // Import required dependencies
const { database, tables } = require("../setup");

// Test suite for the create method of ArtistManager
describe("Create artist", () => {
  it("should create an artist successfully", async () => {
    // Define a sample artist for testing
    const testArtist = {
      name: "Pikasaut",
      description: "peintre depuis ma plus tendre enfance",
      image: "httpmozillafirefox",
    };

    // Send a create request to the artist table with a test artist
    const insertId = await tables.artist.create(testArtist);

    // Check if the newly added artist exists in the database
    const [rows] = await database.query(
      "select * from artist where id = ?",
      insertId
    );

    const foundArtist = rows[0];

    // Assertions
    expect(foundArtist).toBeDefined();
    expect(foundArtist.name).toBe(testArtist.name);
    expect(typeof foundArtist.name).toBe("string");
    expect(foundArtist.description).toBe(testArtist.description);
    expect(typeof foundArtist.description).toBe("string");
    expect(foundArtist.image).toBe(testArtist.image);
    expect(typeof foundArtist.image).toBe("string");
  });

  it("should throw when passing invalid object", async () => {
    // Thx https://jestjs.io/docs/asynchronous#asyncawait

    // Send a create request to the artist table with an empty object
    const promise = tables.artist.create({});

    // Assertions
    await expect(promise).rejects.toThrow();
  });
});
