// Import required dependencies
const { app, request, tables } = require("../setup");

// Test suite for the GET /api/users route
describe("GET /api/users", () => {
  it("should fetch users successfully", async () => {
    // Define a sample user for testing
    const testUser = {
      name: "8sous",
      description: "Lorem Ipsum",
      email: "6sous@exemple.com",
      hashed_password: "0123456789",
      score: 0,
      is_admin: 0,
      is_banned: 0,
      selected_avatar: 1,
      border: "#FFFFFF",
    };

    // Create a sample user in the database
    const insertId = await tables.user.create(testUser);

    // Send a GET request to the /api/users endpoint
    const response = await request(app).get("/api/users");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    // Check if the created user is present in the response
    const foundUser = response.body.find((user) => user.id === insertId);

    // Assertions
    expect(foundUser).toBeInstanceOf(Object);
    expect(foundUser.title).toBe(testUser.title);
  });
});

// Test suite for the GET /api/users/:id route
describe("GET /api/users/:id", () => {
  it("should fetch a single user successfully", async () => {
    // Define a sample user for testing
    const testUser = {
      name: "8sous",
      description: "Lorem Ipsum",
      email: "6sous@exemple.com",
      hashed_password: "0123456789",
      score: 0,
      is_admin: 0,
      is_banned: 0,
      selected_avatar: 1,
      border: "#FFFFFF",
    };

    // Create a sample user in the database
    const insertId = await tables.user.create(testUser);

    // Send a GET request to the /api/users/:id endpoint
    const response = await request(app).get(`/api/users/${insertId}`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.id).toBe(insertId);
    expect(response.body.title).toBe(testUser.title);
  });

  it("should return 404 for non-existent user", async () => {
    // Send a GET request to the /api/users/:id endpoint with an invalid ID
    const response = await request(app).get("/api/users/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the POST /api/users route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling log could help ;)
describe("POST /api/users", () => {
  it("should add a new user successfully", async () => {
    // Define a sample user for testing
    const testUser = {
      name: "8sous",
      description: "Lorem Ipsum",
      email: "6sous@exemple.com",
      hashed_password: "0123456789",
      score: 0,
      is_admin: 0,
      is_banned: 0,
      selected_avatar: 1,
      border: "#FFFFFF",
    };

    // Send a POST request to the /api/users endpoint with a test user
    const response = await request(app).post("/api/users").send(testUser);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toEqual(expect.any(Number));

    // Check if the newly added user exists in the database
    const foundUser = await tables.user.read(response.body.insertId);

    // Assertions
    expect(foundUser).toBeDefined();
    expect(foundUser.title).toBe(testUser.title);
  });
});

// TODO: implement PUT and DELETE routes

// Test suite for the PUT /api/users/:id route
describe("PUT /api/users/:id", () => {
  it("should update an existing user successfully", async () => {
    // Define a sample user for testing
    const testUser = {
      name: "8sous",
      description: "Lorem Ipsum",
      email: "6sous@exemple.com",
      hashed_password: "0123456789",
      score: 0,
      is_admin: 0,
      is_banned: 0,
      selected_avatar: 1,
      border: "#FFFFFF",
    };

    // Create a sample user in the database
    const insertId = await tables.user.create(testUser);

    // Define an updated user object
    const updatedUser = {
      name: "6sous",
      description: "Lorem Ipsum",
      email: "6sous@exemple.com",
      hashed_password: "0123456789",
      score: 0,
      is_admin: 1,
      is_banned: 0,
      selected_avatar: 1,
      border: "#FFFFFF",
    };

    // Send a PUT request to the /api/users/:id endpoint with updated data
    const response = await request(app)
      .put(`/api/users/${insertId}`)
      .send(updatedUser);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the user has been updated in the database
    const foundUser = await tables.user.read(insertId);

    // Assertions
    expect(foundUser).toBeDefined();
    expect(foundUser.title).toBe(updatedUser.title);
  });
});

// Test suite for the DELETE /api/users/:id route
describe("DELETE /api/users/:id", () => {
  it("should delete an existing user successfully", async () => {
    // Define a sample user for testing
    const testUser = {
      name: "8sous",
      description: "Lorem Ipsum",
      email: "6sous@exemple.com",
      hashed_password: "0123456789",
      score: 0,
      is_admin: 0,
      is_banned: 0,
      selected_avatar: 1,
      border: "#FFFFFF",
    };

    // Create a sample user in the database
    const insertId = await tables.user.create(testUser);

    // Send a DELETE request to the /api/users/:id endpoint
    const response = await request(app).delete(`/api/users/${insertId}`);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the user has been deleted from the database
    const foundUser = await tables.user.read(insertId);

    // Assertions
    expect(foundUser).toBeUndefined();
  });
});
