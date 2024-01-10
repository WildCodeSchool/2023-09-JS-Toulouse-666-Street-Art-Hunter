// Import required dependencies
const { app, request, tables } = require("../setup");

// Test suite for the GET /api/artists route
describe("GET /api/artists", () => {
  it("should fetch artists successfully", async () => {
    // Define a sample artist for testing
    const testArtist = {
      name: "Pikasaut",
      description: "peintre depuis ma plus tendre enfance",
      image: "httpmozillafirefox",
    };

    // Create a sample Artist in the database
    const insertId = await tables.artist.create(testArtist);

    // Send a GET request to the /api/artists endpoint
    const response = await request(app).get("/api/artists");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    // Check if the created artist is present in the response
    const foundArtist = response.body.find((artist) => artist.id === insertId);

    // Assertions
    expect(foundArtist).toBeInstanceOf(Object);
    expect(foundArtist.name).toBe(testArtist.name);
    expect(typeof foundArtist.name).toBe("string");
    expect(foundArtist.description).toBe(testArtist.description);
    expect(typeof foundArtist.description).toBe("string");
    expect(foundArtist.image).toBe(testArtist.image);
    expect(typeof foundArtist.image).toBe("string");
  });
});

// Test suite for the GET /api/artists/:id route
describe("GET /api/artists/:id", () => {
  it("should fetch a single artist successfully", async () => {
    // Define a sample artist for testing
    const testArtist = {
      name: "Pikasaut",
      description: "peintre depuis ma plus tendre enfance",
      image: "httpmozillafirefox",
    };

    // Create a sample artist in the database
    const insertId = await tables.artist.create(testArtist);

    // Send a GET request to the /api/artists/:id endpoint
    const response = await request(app).get(`/api/Artists/${insertId}`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.id).toBe(insertId);
    expect(response.body.name).toBe(testArtist.name);
    expect(typeof response.body.name).toBe("string");
    expect(response.body.description).toBe(testArtist.description);
    expect(typeof response.body.description).toBe("string");
    expect(response.body.image).toBe(testArtist.image);
    expect(typeof response.body.image).toBe("string");
  });

  it("should return 404 for non-existent artist", async () => {
    // Send a GET request to the /api/artists/:id endpoint with an invalid ID
    const response = await request(app).get("/api/artists/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the POST /api/artists route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling log could help ;)
describe("POST /api/artists", () => {
  it("should add a new artist successfully", async () => {
    // Define a sample artist for testing
    const testArtist = {
      name: "Pikasaut",
      description: "peintre depuis ma plus tendre enfance",
      image: "httpmozillafirefox",
    };

    // Send a POST request to the /api/artists endpoint with a test artist
    const response = await request(app).post("/api/artists").send(testArtist);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toEqual(expect.any(Number));

    // Check if the newly added artist exists in the database
    const foundArtist = await tables.artist.read(response.body.insertId);

    // Assertions
    expect(foundArtist).toBeDefined();
    expect(foundArtist.name).toBe(testArtist.name);
    expect(typeof foundArtist.name).toBe("string");
    expect(foundArtist.description).toBe(testArtist.description);
    expect(typeof foundArtist.description).toBe("string");
    expect(foundArtist.image).toBe(testArtist.image);
    expect(typeof foundArtist.image).toBe("string");
  });
});

// TODO: implement PUT and DELETE routes

// Test suite for the PUT /api/artists/:id route
describe("PUT /api/artists/:id", () => {
  it("should update an existing artist successfully", async () => {
    // Define a sample artist for testing
    const testArtist = {
      name: "Pikasaut",
      description: "peintre depuis ma plus tendre enfance",
      image: "httpmozillafirefox",
    };

    // Create a sample artist in the database
    const insertId = await tables.artist.create(testArtist);

    // Define an updated artist object
    const updatedArtist = {
      name: "Pikasaut",
      description: "peintre depuis ma plus tendre enfance",
      image: "httpmozillafirefox",
    };

    // Send a PUT request to the /api/artists/:id endpoint with updated data
    const response = await request(app)
      .put(`/api/artists/${insertId}`)
      .send(updatedArtist);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the artist has been updated in the database
    const foundArtist = await tables.artist.read(insertId);

    // Assertions
    expect(foundArtist).toBeDefined();
    expect(foundArtist.name).toBe(updatedArtist.name);
    expect(typeof foundArtist.name).toBe("string");
    expect(foundArtist.description).toBe(updatedArtist.description);
    expect(typeof foundArtist.description).toBe("string");
    expect(foundArtist.image).toBe(updatedArtist.image);
    expect(typeof foundArtist.image).toBe("string");
  });
});

// Test suite for the DELETE /api/artists/:id route
describe("DELETE /api/artists/:id", () => {
  it("should delete an existing artist successfully", async () => {
    // Define a sample artist for testing
    const testArtist = {
      name: "Pikasaut",
      description: "peintre depuis ma plus tendre enfance",
      image: "httpmozillafirefox",
    };

    // Create a sample artist in the database
    const insertId = await tables.artist.create(testArtist);

    // Send a DELETE request to the /api/artists/:id endpoint
    const response = await request(app).delete(`/api/artists/${insertId}`);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the artist has been deleted from the database
    const foundArtist = await tables.artist.read(insertId);

    // Assertions
    expect(foundArtist).toBeUndefined();
  });
});
