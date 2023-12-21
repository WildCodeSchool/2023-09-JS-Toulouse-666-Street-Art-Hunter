// // Import required dependencies
const { database, tables } = require("../setup");

// Test suite for the create method of ItemManager
describe("Create photo", () => {
  it("should create an photo successfully", async () => {
    // Define a sample photo for testing
    const testPhoto = {
      image: "liens vers l'image",
      is_validated: 1,
      user_id: 1,
      artwork_id: 1,
    };

    // Send a create request to the photo table with a test photo
    const insertId = await tables.photo.create(testPhoto);

    // Check if the newly added photo exists in the database
    const [rows] = await database.query(
      "select * from photo where id = ?",
      insertId
    );

    const foundPhoto = rows[0];

    // Assertions
    expect(foundPhoto).toBeDefined();
    expect(foundPhoto.image).toBe(testPhoto.image);
    expect(typeof foundPhoto.image).toBe("string");
    expect(foundPhoto.is_validated).toBe(testPhoto.is_validated);
    expect(typeof foundPhoto.is_validated).toBe("number");
    expect(foundPhoto.user_id).toBe(testPhoto.user_id);
    expect(typeof foundPhoto.user_id).toBe("number");
    expect(foundPhoto.artwork_id).toBe(testPhoto.artwork_id);
    expect(typeof foundPhoto.artwork_id).toBe("number");
  });

  it("should throw when passing invalid object", async () => {
    // Thx https://jestjs.io/docs/asynchronous#asyncawait

    // Send a create request to the photo table with an empty object
    const promise = tables.photo.create({});

    // Assertions
    await expect(promise).rejects.toThrow();
  });
});
