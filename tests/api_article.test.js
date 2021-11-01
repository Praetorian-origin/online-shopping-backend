const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
// The test imports the Express application from the app.js module and wraps it with the supertest function into a so-called superagent object. This object is assigned to the api variable and tests can use it for making HTTP requests to the backend.

const Article = require("../models/article");


describe("when there is initially some articles saved", () => {
  beforeEach(async () => {
    await Article.deleteMany({});
    await Article.insertMany(helper.initialArticles);
  });

  test("articles are returned as json", async () => {
    await api
      .get("/api/articles")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all articles are returned", async () => {
    const response = await api.get("/api/articles");

    expect(response.body).toHaveLength(helper.initialArticles.length);
  });

  test("a specific article is within the returned articles", async () => {
    const response = await api.get("/api/articles");

    const names = response.body.map((r) => r.name);
    expect(names).toContain("Article 1");
  });

  describe("viewing a specific article", () => {
    test("succeeds with a valid id", async () => {
      const articlesAtStart = await helper.articlesInDb();

      const articleToView = articlesAtStart[0];

      const resultArticle = await api
        .get(`/api/articles/${articleToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const processedArticleToView = JSON.parse(JSON.stringify(articleToView));

      expect(resultArticle.body).toEqual(processedArticleToView);
    });

    test("fails with statuscode 404 if article does not exist", async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api.get(`/api/articles/${validNonexistingId}`).expect(404);
    });

    test("fails with statuscode 400 id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";

      await api.get(`/api/articles/${invalidId}`).expect(400);
    });
  });

  describe("addition of a new article", () => {
    test("succeeds with valid data", async () => {
      const newArticle = {
        name: "Article n°XZ6748-Z",
        descr: `Description de l'article`,
        stock: 70
      };

      await api
        .post("/api/articles")
        .send(newArticle)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const articlesAtEnd = await helper.articlesInDb();
      expect(articlesAtEnd).toHaveLength(helper.initialArticles.length + 1);

      const names = articlesAtEnd.map((n) => n.name);
      expect(names).toContain("Article n°XZ6748-Z");
    });

    test("fails with status code 400 if data sent for creation is invalid", async () => {
      const newArticle = {
        name: 'article without all its properties',
      };

      await api.post("/api/articles").send(newArticle).expect(400);

      const articlesAtEnd = await helper.articlesInDb();

      expect(articlesAtEnd).toHaveLength(helper.initialArticles.length);
    });
  });

  describe("deletion of a article", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const articlesAtStart = await helper.articlesInDb();
      const articleToDelete = articlesAtStart[0];

      await api.delete(`/api/articles/${articleToDelete.id}`).expect(204);

      const articlesAtEnd = await helper.articlesInDb();

      expect(articlesAtEnd).toHaveLength(helper.initialArticles.length - 1);

      const name = articlesAtEnd.map((r) => r.name);

      expect(name).not.toContain(articleToDelete.name);
    });
  });
});


afterAll(() => {
  mongoose.connection.close();
});
