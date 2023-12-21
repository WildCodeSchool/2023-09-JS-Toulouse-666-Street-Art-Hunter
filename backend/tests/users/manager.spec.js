// Import required dependencies
const { database, tables } = require("../setup");

// Test suite for the create method of UserManager
describe("Create user", () => {
  it("should create an user successfully", async () => {
    // Define a sample user for testing
    const testUser = {
      name: "6sous",
      description: "Lorem Ipsum",
      email: "6sous@exemple.com",
      password: "0123456789",
      score: 0,
      is_admin: 0,
      is_banned: 0,
      selected_avatar: 1,
      border: "#FFFFFF",
    };

    // Send a create request to the user table with a test user
    const insertId = await tables.user.create(testUser);

    // Check if the newly added user exists in the database
    const [rows] = await database.query(
      "select * from user where id = ?",
      insertId
    );

    const foundUser = rows[0];

    expect(foundUser).toBeDefined();
    expect(foundUser.title).toBe(testUser.title);
  });

  it("should throw when passing invalid object", async () => {
    const promise = tables.user.create({});

    await expect(promise).rejects.toThrow();
  });
});
