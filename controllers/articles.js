let articles = require("../models/articlesData");

articles = articles.articles


const articlesRouter = require("express").Router();

const generateId = () => {
  const maxId =
    articles.length > 0 ? Math.max(...articles.map((n) => n.id)) : 0;
  return maxId + 1;
};



articlesRouter.get("/:id", (request, response) => {

const id = Number(request.params.id);
const article = articles.find(article => article.id === id);


  if (article === null || article === undefined) {
    return response.status(404).end();
  }

  return response.json(article);
});

articlesRouter.put("/:id", (request, response, next) => {
  const body = request.body;
  const idToUpdate = Number(request.params.id);

  if (!body.name) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const updatedArticle = {
    id: idToUpdate,
    name: body.name,
    descr: body.descr,
    stock: body.stock,
  };

  articles = articles.map((article) =>
    article.id === idToUpdate ? updatedArticle : article
  );


  response.json(updatedArticle);
});

articlesRouter.post("/", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const article = {
    id: generateId(),
    name: body.name,
    descr: body.descr,
    stock: body.stock,
  };

  articles = articles.concat(article);
  response.json(article);
});

articlesRouter.get("/", (request, response) => response.json(articles));

articlesRouter.delete("/:id", (request, response) => {
  if (request.params.id === undefined || request.params.id === null) {
    return response.status(400).json({
      error: "Id to delete missing",
    });
  }

  const id = Number(request.params.id);

  articles = articles.filter((article) => article.id !== id);
  response.status(200).json({
    info: "article deleted",
  });
});

module.exports = articlesRouter;
