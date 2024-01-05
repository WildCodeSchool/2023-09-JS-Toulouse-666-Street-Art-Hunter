// Import required dependencies
const { app, request, tables } = require("../setup");

// Test suite for the GET /api/artworks route
describe("GET /api/artworks", () => {
  it("should fetch artworks successfully", async () => {
    // Define a sample artwork for testing
    const testArtwork = {
      image: "exemple.img",
      longitude: "43°35'46.4°N",
      latitude: "1°27'18.9°E",
      adress: "1 Rue de Valenciennes, 31000 Toulouse",
      description: "oeuvre expérimentale",
      date_published: "2023-12-19",
      ask_to_archived: 0,
      is_archived: 0,
      is_validate: 1,
      artistId: null,
    };

    // Create a sample artwork in the database
    const insertId = await tables.artwork.create(testArtwork);

    // Send a GET request to the /api/artworks endpoint
    const response = await request(app).get("/api/artworks");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    // Check if the created artwork is present in the response
    const foundArtwork = response.body.find(
      (artwork) => artwork.id === insertId
    );

    // Assertions
    expect(foundArtwork).toBeInstanceOf(Object);
    expect(foundArtwork.title).toBe(testArtwork.title);
  });
});

// Test suite for the GET /api/artworks/:id route
describe("GET /api/artworks/:id", () => {
  it("should fetch a single artwork successfully", async () => {
    // Define a sample artwork for testing
    const testArtwork = {
      image: "exemple.img",
      longitude: "43°35'46.4°N",
      latitude: "1°27'18.9°E",
      adress: "1 Rue de Valenciennes, 31000 Toulouse",
      description: "oeuvre expérimentale",
      date_published: "2023-12-19",
      ask_to_archived: 0,
      is_archived: 0,
      is_validate: 1,
      artistId: null,
    };

    // Create a sample artwork in the database
    const insertId = await tables.artwork.create(testArtwork);

    // Send a GET request to the /api/artworks/:id endpoint
    const response = await request(app).get(`/api/artworks/${insertId}`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.id).toBe(insertId);
    expect(response.body.title).toBe(testArtwork.title);
  });

  it("should return 404 for non-existent artwork", async () => {
    // Send a GET request to the /api/artworks/:id endpoint with an invalid ID
    const response = await request(app).get("/api/artworks/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the POST /api/artworks route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling log could help ;)
describe("POST /api/artworks", () => {
  it("should add a new artwork successfully", async () => {
    // Define a sample artwork for testing
    const testArtwork = {
      image: "exemple.img",
      longitude: "43°35'46.4°N",
      latitude: "1°27'18.9°E",
      adress: "1 Rue de Valenciennes, 31000 Toulouse",
      description: "oeuvre expérimentale",
      date_published: "2023-12-19",
      ask_to_archived: 0,
      is_archived: 0,
      is_validate: 1,
      artistId: null,
    };

    // Send a POST request to the /api/artworks endpoint with a test artwork
    const response = await request(app).post("/api/artworks").send(testArtwork);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toEqual(expect.any(Number));

    // Check if the newly added artwork exists in the database
    const foundArtwork = await tables.artwork.read(response.body.insertId);

    // Assertions
    expect(foundArtwork).toBeDefined();
    expect(foundArtwork.title).toBe(testArtwork.title);
  });
});

// TODO: implement PUT and DELETE routes

// Test suite for the PUT /api/artworks/:id route
describe("PUT /api/artworks/:id", () => {
  it("should update an existing artwork successfully", async () => {
    // Define a sample artwork for testing
    const testArtwork = {
      image: "exemple.img",
      longitude: "43°35'46.4°N",
      latitude: "1°27'18.9°E",
      adress: "1 Rue de Valenciennes, 31000 Toulouse",
      description: "oeuvre expérimentale",
      date_published: "2023-12-19",
      ask_to_archived: 0,
      is_archived: 0,
      is_validate: 1,
      artistId: null,
    };

    // Create a sample artwork in the database
    const insertId = await tables.artwork.create(testArtwork);

    // Define an updated artwork object
    const updatedArtwork = {
      image: "exemple.img",
      longitude: "43°35'46.4°S",
      latitude: "1°27'18.9°S",
      adress: "10 Rue de Valences, 13000 Marseille",
      description: "Oeuvre cool",
      date_published: "2023-12-19",
      ask_to_archived: 0,
      is_archived: 1,
      is_validate: 1,
      artistId: null,
    };

    // Send a PUT request to the /api/artworks/:id endpoint with updated data
    const response = await request(app)
      .put(`/api/artworks/${insertId}`)
      .send(updatedArtwork);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the artwork has been updated in the database
    const foundArtwork = await tables.artwork.read(insertId);

    // Assertions
    expect(foundArtwork).toBeDefined();
    expect(foundArtwork.title).toBe(updatedArtwork.title);
  });
});

// Test suite for the DELETE /api/artworks/:id route
describe("DELETE /api/artworks/:id", () => {
  it("should delete an existing artwork successfully", async () => {
    // Define a sample artwork for testing
    const testArtwork = {
      image: "exemple.img",
      longitude: "43°35'46.4°N",
      latitude: "1°27'18.9°E",
      adress: "1 Rue de Valenciennes, 31000 Toulouse",
      description: "oeuvre expérimentale",
      date_published: "2023-12-19",
      ask_to_archived: 0,
      is_archived: 0,
      is_validate: 1,
      artistId: null,
    };

    // Create a sample artwork in the database
    const insertId = await tables.artwork.create(testArtwork);

    // Send a DELETE request to the /api/artworks/:id endpoint
    const response = await request(app).delete(`/api/artworks/${insertId}`);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the artwork has been deleted from the database
    const foundArtwork = await tables.artwork.read(insertId);

    // Assertions
    expect(foundArtwork).toBeUndefined();
  });
});
