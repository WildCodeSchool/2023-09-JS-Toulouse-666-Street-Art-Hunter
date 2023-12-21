// Import required dependencies
const { app, request, tables } = require("../setup");

// Test suite for the GET /api/avatars route
describe("GET /api/avatars", () => {
  it("should fetch avatars successfully", async () => {
    // Define a sample avatar_image for testing
    const testAvatarImage = {
      name: "Baleine",
      objective: "4900 pts",
      imgUrl: "https://images.unsplash.com/photo-1676324647438",
    };

    // Create a sample avatar_image in the database
    const insertId = await tables.avatar_image.create(testAvatarImage);

    // Send a GET request to the /api/avatars endpoint
    const response = await request(app).get("/api/avatars");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    // Check if the created avatar_image is present in the response
    const foundAvatarImage = response.body.find(
      (avatarImage) => avatarImage.id === insertId
    );

    // Assertions
    expect(foundAvatarImage).toBeInstanceOf(Object);
    expect(foundAvatarImage.title).toBe(testAvatarImage.title);
  });
});

// Test suite for the GET /api/avatars/:id route
describe("GET /api/avatars/:id", () => {
  it("should fetch a single avatar_image successfully", async () => {
    // Define a sample avatar_image for testing
    const testAvatarImage = {
      name: "Baleine",
      objective: "4900 pts",
      imgUrl: "https://images.unsplash.com/photo-1676324647438",
    };

    // Create a sample avatar_image in the database
    const insertId = await tables.avatar_image.create(testAvatarImage);

    // Send a GET request to the /api/avatars/:id endpoint
    const response = await request(app).get(`/api/avatars/${insertId}`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.id).toBe(insertId);
    expect(response.body.title).toBe(testAvatarImage.title);
  });

  it("should return 404 for non-existent avatar_image", async () => {
    // Send a GET request to the /api/avatars/:id endpoint with an invalid ID
    const response = await request(app).get("/api/avatars/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the POST /api/avatars route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling log could help ;)
describe("POST /api/avatars", () => {
  it("should add a new avatar_image successfully", async () => {
    // Define a sample avatar_image for testing
    const testAvatarImage = {
      name: "Baleine",
      objective: "4900 pts",
      imgUrl: "https://images.unsplash.com/photo-1676324647438",
    };

    // Send a POST request to the /api/avatars endpoint with a test avatar_image
    const response = await request(app)
      .post("/api/avatars")
      .send(testAvatarImage);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toEqual(expect.any(Number));

    // Check if the newly added avatar_image exists in the database
    const foundAvatarImage = await tables.avatar_image.read(
      response.body.insertId
    );

    // Assertions
    expect(foundAvatarImage).toBeDefined();
    expect(foundAvatarImage.title).toBe(testAvatarImage.title);
  });
});

// TODO: implement PUT and DELETE routes

// Test suite for the PUT /api/avatars/:id route
describe("PUT /api/avatars/:id", () => {
  it("should update an existing avatar_image successfully", async () => {
    // Define a sample avatar_image for testing

    const testAvatarImage = {
      name: "Baleine",
      objective: "4900 pts",
      imgUrl: "https://images.unsplash.com/photo-1676324647438",
    };

    // Create a sample avatar_image in the database
    const insertId = await tables.avatar_image.create(testAvatarImage);

    // Define an updated avatar_image object
    const updatedAvatarImage = {
      name: "Loup",
      objective: "9000 pts",
      imgUrl: "https://images.unsplash.com/photo-456747438",
    };

    // Send a PUT request to the /api/avatars/:id endpoint with updated data
    const response = await request(app)
      .put(`/api/avatars/${insertId}`)
      .send(updatedAvatarImage);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the avatar_image has been updated in the database
    const foundAvatarImage = await tables.avatar_image.read(insertId);

    // Assertions
    expect(foundAvatarImage).toBeDefined();
    expect(foundAvatarImage.title).toBe(updatedAvatarImage.title);
  });
});

// Test suite for the DELETE /api/avatars/:id route
describe("DELETE /api/avatars/:id", () => {
  it("should delete an existing avatar_image successfully", async () => {
    // Define a sample avatar_image for testing
    const testAvatarImage = {
      name: "Baleine",
      objective: "4900 pts",
      imgUrl: "https://images.unsplash.com/photo-1676324647438",
    };

    // Create a sample avatar_image in the database
    const insertId = await tables.avatar_image.create(testAvatarImage);

    // Send a DELETE request to the /api/avatars/:id endpoint
    const response = await request(app).delete(`/api/avatars/${insertId}`);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the avatar_image has been deleted from the database
    const foundAvatarImage = await tables.avatar_image.read(insertId);

    // Assertions
    expect(foundAvatarImage).toBeUndefined();
  });
});
