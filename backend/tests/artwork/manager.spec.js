// Importer les dépendances requises
const { database, tables } = require("../setup");

// Suite de tests pour la méthode create de ArtworkManager
describe("Create artwork", () => {
  it("should create an artwork successfully", async () => {
    // Définir une table artwork d'exemple pour les tests
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

    // Envoyer une demande de création à la table artwork avec un test
    const insertId = await tables.artwork.create(testArtwork);

    // Vérifier si la nouvelle œuvre d'art ajoutée existe dans la base de données
    const [rows] = await database.query(
      "select * from artwork where id = ?",
      insertId
    );

    const foundArtwork = rows[0];

    // Assertions
    expect(foundArtwork).toBeDefined();
    expect(foundArtwork.title).toBe(testArtwork.title);
  });

  it("should throw when passing invalid object", async () => {
    // Remerciements https://jestjs.io/docs/asynchronous#asyncawait

    // Envoyer une demande de création à la table artwork avec un objet vide
    const promise = tables.artwork.create({});

    // Assertions
    await expect(promise).rejects.toThrow();
  });
});
