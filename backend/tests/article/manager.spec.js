// Importer les dépendances requises
const { database, tables } = require("../setup");

// Suite de tests pour la méthode create de ArticleManager
describe("Create article", () => {
  it("should create an article successfully", async () => {
    // Définir une table article d'exemple pour les tests
    const testArticle = {
      title: "Voici un titre",
      description: "Et voilà une description",
      image: "image.img",
      isArchived: 0,
    };

    // Envoyer une demande de création à la table article avec un test
    const insertId = await tables.article.create(testArticle);

    // Vérifier si la nouvelle œuvre d'art ajoutée existe dans la base de données
    const [rows] = await database.query(
      "select * from article where id = ?",
      insertId
    );

    const foundArticle = rows[0];

    // Assertions
    expect(foundArticle).toBeDefined();
    expect(foundArticle.title).toBe(testArticle.title);
  });

  it("should throw when passing invalid object", async () => {
    // Remerciements https://jestjs.io/docs/asynchronous#asyncawait

    // Envoyer une demande de création à la table article avec un objet vide
    const promise = tables.article.create({});

    // Assertions
    await expect(promise).rejects.toThrow();
  });
});
