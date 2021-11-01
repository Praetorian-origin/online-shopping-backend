const Article = require("../models/article");

const articlesRouter = require("express").Router();

articlesRouter.get("/:id", async (request, response) => {
  const article = await Article.findById(request.params.id);

  if (article) {
    response.json(article.toJSON());
  } else {
    response.status(404).end();
  }
});

articlesRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const articleToModify = {
    name: body.name,
    descr: body.descr,
    stock: body.stock,
  };

  const updatedArticle = await Article.findByIdAndUpdate(
    request.params.id,
    articleToModify,
    { new: true }
  );
  response.json(updatedArticle.toJSON());
});

articlesRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.name && !body.descr && !body.stock) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const article = new Article({
    name: body.name,
    descr: body.descr,
    stock: body.stock,
  });

  await article.save();
  response.json(article.toJSON());
});

articlesRouter.get("/", async (request, response) => {
  const articles = await Article.find({});
  response.json(articles.map((article) => article.toJSON()));
});

articlesRouter.delete("/:id", async (request, response) => {
  if (request.params.id === undefined || request.params.id === null) {
    return response.status(400).json({
      error: "Id to delete missing",
    });
  }

  await Article.findByIdAndDelete(request.params.id);

  response.status(200).json({
    info: "article deleted",
  });
});

module.exports = articlesRouter;
