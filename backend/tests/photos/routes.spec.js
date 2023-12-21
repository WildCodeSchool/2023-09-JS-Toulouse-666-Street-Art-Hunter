// Import required dependencies
const { app, request, tables } = require("../setup");

// Test suite for the GET /api/photos route
describe("GET /api/photos", () => {
  it("should fetch photos successfully", async () => {
    // Define a sample photo for testing
    const testPhoto = {
      image: "liens vers l'image",
      is_validated: 1,
      user_id: 1,
      artwork_id: 1,
    };

    // Create a sample Photo in the database
    const insertId = await tables.photo.create(testPhoto);

    // Send a GET request to the /api/photos endpoint
    const response = await request(app).get("/api/photos");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    // Check if the created photo is present in the response
    const foundPhoto = response.body.find((photo) => photo.id === insertId);

    // Assertions
    expect(foundPhoto).toBeInstanceOf(Object);
    expect(foundPhoto.image).toBe(testPhoto.image);
    expect(typeof foundPhoto.image).toBe("string");
    expect(foundPhoto.is_validated).toBe(testPhoto.is_validated);
    expect(typeof foundPhoto.is_validated).toBe("number");
    expect(foundPhoto.user_id).toBe(testPhoto.user_id);
    expect(typeof foundPhoto.user_id).toBe("number");
    expect(foundPhoto.artwork_id).toBe(testPhoto.artwork_id);
    expect(typeof foundPhoto.artwork_id).toBe("number");
  });
});

// Test suite for the GET /api/photos/:id route
describe("GET /api/photos/:id", () => {
  it("should fetch a single photo successfully", async () => {
    // Define a sample photo for testing
    const testPhoto = {
      image: "liens vers l'image",
      is_validated: 1,
      user_id: 1,
      artwork_id: 1,
    };

    // Create a sample photo in the database
    const insertId = await tables.photo.create(testPhoto);

    // Send a GET request to the /api/photos/:id endpoint
    const response = await request(app).get(`/api/Photos/${insertId}`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.id).toBe(insertId);
    expect(response.body.image).toBe(testPhoto.image);
    expect(typeof response.body.image).toBe("string");
    expect(response.body.is_validated).toBe(testPhoto.is_validated);
    expect(typeof response.body.is_validated).toBe("number");
    expect(response.body.user_id).toBe(testPhoto.user_id);
    expect(typeof response.body.user_id).toBe("number");
    expect(response.body.artwork_id).toBe(testPhoto.artwork_id);
    expect(typeof response.body.artwork_id).toBe("number");
  });

  it("should return 404 for non-existent photo", async () => {
    // Send a GET request to the /api/photos/:id endpoint with an invalid ID
    const response = await request(app).get("/api/photos/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the POST /api/photos route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling log could help ;)
describe("POST /api/photos", () => {
  it("should add a new photo successfully", async () => {
    // Define a sample photo for testing
    const testPhoto = {
      image: "liens vers l'image",
      is_validated: 1,
      user_id: 1,
      artwork_id: 1,
    };

    // Send a POST request to the /api/photos endpoint with a test photo
    const response = await request(app).post("/api/photos").send(testPhoto);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toEqual(expect.any(Number));

    // Check if the newly added photo exists in the database
    const foundphoto = await tables.photo.read(response.body.insertId);

    // Assertions
    expect(foundphoto).toBeDefined();
    expect(foundphoto.image).toBe(testPhoto.image);
    expect(typeof foundphoto.image).toBe("string");

    expect(foundphoto.is_validated).toBe(testPhoto.is_validated);
    expect(typeof foundphoto.is_validated).toBe("number");

    expect(foundphoto.user_id).toBe(testPhoto.user_id);
    expect(typeof foundphoto.user_id).toBe("number");

    expect(foundphoto.artwork_id).toBe(testPhoto.artwork_id);
    expect(typeof foundphoto.artwork_id).toBe("number");
  });
});

// TODO: implement PUT and DELETE routes

// Test suite for the PUT /api/photos/:id route
describe("PUT /api/photos/:id", () => {
  it("should update an existing photo successfully", async () => {
    // Define a sample photo for testing
    const testPhoto = {
      image: "liens vers l'image",
      is_validated: 1,
      user_id: 1,
      artwork_id: 1,
    };

    // Create a sample photo in the database
    const insertId = await tables.photo.create(testPhoto);

    // Define an updated photo object
    const updatedPhoto = {
      image: "liens vers l'image modifier",
      is_validated: 0,
      user_id: 1,
      artwork_id: 1,
    };

    // Send a PUT request to the /api/photos/:id endpoint with updated data
    const response = await request(app)
      .put(`/api/photos/${insertId}`)
      .send(updatedPhoto);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the photo has been updated in the database
    const foundPhoto = await tables.photo.read(insertId);

    // Assertions
    expect(foundPhoto).toBeDefined();
    expect(foundPhoto.image).toBe(updatedPhoto.image);
    expect(typeof foundPhoto.image).toBe("string");

    expect(foundPhoto.is_validated).toBe(updatedPhoto.is_validated);
    expect(typeof foundPhoto.is_validated).toBe("number");

    expect(foundPhoto.user_id).toBe(updatedPhoto.user_id);
    expect(typeof foundPhoto.user_id).toBe("number");

    expect(foundPhoto.artwork_id).toBe(updatedPhoto.artwork_id);
    expect(typeof foundPhoto.artwork_id).toBe("number");
  });
});

// Test suite for the DELETE /api/photos/:id route
describe("DELETE /api/photos/:id", () => {
  it("should delete an existing photo successfully", async () => {
    // Define a sample photo for testing
    const testPhoto = {
      image: "liens vers l'image modifier",
      is_validated: 0,
      user_id: 1,
      artwork_id: 1,
    };

    // Create a sample photo in the database
    const insertId = await tables.photo.create(testPhoto);

    // Send a DELETE request to the /api/photos/:id endpoint
    const response = await request(app).delete(`/api/photos/${insertId}`);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the photo has been deleted from the database
    const foundPhoto = await tables.photo.read(insertId);

    // Assertions
    expect(foundPhoto).toBeUndefined();
  });
});
