// Import required dependencies
const { app, request, tables } = require("../setup");

// Test suite for the GET /api/articles route
describe("GET /api/articles", () => {
  it("should fetch articles successfully", async () => {
    // Define a sample article for testing
    const testArticle = {
      title: "Voici un titre",
      description: "Et voilà une description",
      image: "image.img",
      isArchived: 0,
    };

    // Create a sample article in the database
    const insertId = await tables.article.create(testArticle);

    // Send a GET request to the /api/articles endpoint
    const response = await request(app).get("/api/articles");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    // Check if the created article is present in the response
    const foundArticle = response.body.find(
      (article) => article.id === insertId
    );

    // Assertions
    expect(foundArticle).toBeInstanceOf(Object);
    expect(foundArticle.title).toBe(testArticle.title);
  });
});

// Test suite for the GET /api/articles/:id route
describe("GET /api/articles/:id", () => {
  it("should fetch a single article successfully", async () => {
    // Define a sample article for testing
    const testArticle = {
      title: "Voici un titre",
      description: "Et voilà une description",
      image: "image.img",
      isArchived: 0,
    };

    // Create a sample article in the database
    const insertId = await tables.article.create(testArticle);

    // Send a GET request to the /api/articles/:id endpoint
    const response = await request(app).get(`/api/articles/${insertId}`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.id).toBe(insertId);
    expect(response.body.title).toBe(testArticle.title);
  });

  it("should return 404 for non-existent article", async () => {
    // Send a GET request to the /api/articles/:id endpoint with an invalid ID
    const response = await request(app).get("/api/articles/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the POST /api/articles route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling log could help ;)
describe("POST /api/articles", () => {
  it("should add a new article successfully", async () => {
    // Define a sample article for testing
    const testArticle = {
      title: "Voici un titre",
      description: "Et voilà une description",
      image: "image.img",
      isArchived: 0,
    };

    // Send a POST request to the /api/articles endpoint with a test article
    const response = await request(app).post("/api/articles").send(testArticle);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toEqual(expect.any(Number));

    // Check if the newly added article exists in the database
    const foundArticle = await tables.article.read(response.body.insertId);

    // Assertions
    expect(foundArticle).toBeDefined();
    expect(foundArticle.title).toBe(testArticle.title);
  });
});

// TODO: implement PUT and DELETE routes

// Test suite for the PUT /api/articles/:id route
describe("PUT /api/articles/:id", () => {
  it("should update an existing article successfully", async () => {
    // Define a sample article for testing
    const testArticle = {
      title: "Voici un titre",
      description: "Et voilà une description",
      image: "image.img",
      isArchived: 0,
    };

    // Create a sample article in the database
    const insertId = await tables.article.create(testArticle);

    // Define an updated article object
    const updatedArticle = {
      title: "Voici un titre modifié",
      description: "Et voilà une description modifiée",
      image: "image_modifiée.img",
      isArchived: 1,
    };

    // Send a PUT request to the /api/articles/:id endpoint with updated data
    const response = await request(app)
      .put(`/api/articles/${insertId}`)
      .send(updatedArticle);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the article has been updated in the database
    const foundArticle = await tables.article.read(insertId);

    // Assertions
    expect(foundArticle).toBeDefined();
    expect(foundArticle.title).toBe(updatedArticle.title);
  });
});

// Test suite for the DELETE /api/articles/:id route
describe("DELETE /api/articles/:id", () => {
  it("should delete an existing article successfully", async () => {
    // Define a sample article for testing
    const testArticle = {
      title: "Voici un titre",
      description: "Et voilà une description",
      image: "image.img",
      isArchived: 0,
    };

    // Create a sample article in the database
    const insertId = await tables.article.create(testArticle);

    // Send a DELETE request to the /api/articles/:id endpoint
    const response = await request(app).delete(`/api/articles/${insertId}`);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the article has been deleted from the database
    const foundArticle = await tables.article.read(insertId);

    // Assertions
    expect(foundArticle).toBeUndefined();
  });
});
