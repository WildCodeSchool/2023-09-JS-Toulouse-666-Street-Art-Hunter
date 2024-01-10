// Importer les dépendances requises
const { database, tables } = require("../setup");

// Suite de tests pour la méthode create de AvatarImageManager
describe("Create avatar_image", () => {
  it("should create an avatar_image successfully", async () => {
    // Définir une table avatar_image d'exemple pour les tests
    const testAvatarImage = {
      name: "Baleine",
      objective: "4900 pts",
      img_url: "https://images.unsplash.com/photo-1676324647438",
    };

    // Envoyer une demande de création à la table avatar_image avec un test
    const insertId = await tables.avatar_image.create(testAvatarImage);

    // Vérifier si l'image de l'avatar existe dans la base de données
    const [rows] = await database.query(
      "select * from avatar_image where id = ?",
      insertId
    );

    const foundAvatarImage = rows[0];

    // Assertions
    expect(foundAvatarImage).toBeDefined();
    expect(foundAvatarImage.title).toBe(testAvatarImage.title);
  });

  it("should throw when passing invalid object", async () => {
    // Remerciements https://jestjs.io/docs/asynchronous#asyncawait

    // Envoyer une demande de création à la table avatar_image avec un objet vide
    const promise = tables.avatar_image.create({});

    // Assertions
    await expect(promise).rejects.toThrow();
  });
});
