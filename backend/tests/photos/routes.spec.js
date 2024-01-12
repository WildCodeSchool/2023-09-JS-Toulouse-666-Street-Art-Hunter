// Importation des dépendances requises
const { app, request, tables } = require("../setup");

// -------------------------- Route GET /api/photos --------------------------
describe("GET /api/photos", () => {
  it("should fetch photos successfully", async () => {
    // Define a sample photo for testing
    const testPhoto = {
      image: "liens vers l'image",
      is_validated: 1,
      user_id: 1,
      artwork_id: 1,
    };

    // Créer une photo d'exemple dans la base de données
    const insertId = await tables.photo.create(testPhoto);

    // Envoyer une requête GET à l'endpoint /api/photos
    const response = await request(app).get("/api/photos");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    // Vérifier si la photo créée est présente dans la réponse
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

// Suite de tests pour la route GET /api/photos/:id
describe("GET /api/photos/:id", () => {
  it("should fetch a single photo successfully", async () => {
    // Définir une photo d'exemple pour les tests
    const testPhoto = {
      image: "liens vers l'image",
      is_validated: 1,
      user_id: 1,
      artwork_id: 1,
    };

    // Créer une photo d'exemple dans la base de données
    const insertId = await tables.photo.create(testPhoto);

    // Envoyer une requête GET à l'endpoint /api/photos/:id
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

// -------------------------- Route POST /api/photos  --------------------------
// Ne passe pas : peut-être quelque chose à changer dans la configuration de l'application :/
// Astuce : activer les journaux pourrait aider ;)
describe("POST /api/photos", () => {
  it("should add a new photo successfully", async () => {
    // Définir une photo d'exemple pour les tests
    const testPhoto = {
      image: "liens vers l'image",
      is_validated: 1,
      user_id: 1,
      artwork_id: 1,
    };

    // Envoyer une requête POST à l'endpoint /api/photos avec une photo de test
    const response = await request(app).post("/api/photos").send(testPhoto);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toEqual(expect.any(Number));

    // Vérifier si la nouvelle photo ajoutée existe dans la base de données
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

// -------------------------- Routes PUT et DELETE --------------------------

// Suite de tests pour la route PUT /api/photos/:id
describe("PUT /api/photos/:id", () => {
  it("should update an existing photo successfully", async () => {
    // Définir une photo d'exemple pour les tests
    const testPhoto = {
      image: "liens vers l'image",
      is_validated: 1,
      user_id: 1,
      artwork_id: 1,
    };

    // Créer une photo d'exemple dans la base de données
    const insertId = await tables.photo.create(testPhoto);

    // Définir un objet de photo mis à jour
    const updatedPhoto = {
      image: "liens vers l'image modifier",
      is_validated: 0,
      user_id: 1,
      artwork_id: 1,
    };

    // Envoyer une requête PUT à l'endpoint /api/photos/:id avec des données mises à jour
    const response = await request(app)
      .put(`/api/photos/${insertId}`)
      .send(updatedPhoto);

    // Assertions
    expect(response.status).toBe(204);

    // Vérifier si la photo a été mise à jour dans la base de données
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

// Suite de tests pour la route DELETE /api/photos/:id
describe("DELETE /api/photos/:id", () => {
  it("should delete an existing photo successfully", async () => {
    // Définir une photo d'exemple pour les tests
    const testPhoto = {
      image: "liens vers l'image modifier",
      is_validated: 0,
      user_id: 1,
      artwork_id: 1,
    };

    // Créer une photo d'exemple dans la base de données
    const insertId = await tables.photo.create(testPhoto);

    // Envoyer une requête DELETE à l'endpoint /api/photos/:id
    const response = await request(app).delete(`/api/photos/${insertId}`);

    // Assertions
    expect(response.status).toBe(204);

    // Vérifier si la photo a été supprimée de la base de données
    const foundPhoto = await tables.photo.read(insertId);

    // Assertions
    expect(foundPhoto).toBeUndefined();
  });
});
