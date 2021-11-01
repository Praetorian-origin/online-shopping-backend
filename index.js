
  
const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})



// const express = require("express");
// const app = express();
// const cors = require("cors");


// app.use(cors());
// app.use(express.json());

// let articles = [
//   {
//     id: 2,
//     descr: "Browser can execute only JavaScript",
//     name: "Browser",
//     stock: 2,
//   },
//   {
//     id: 3,
//     descr: "GET and POST are the most stock methods of HTTP protocol",
//     name: "GET AND Post",
//     stock: 51,
//   },
//   {
//     id: 5,
//     name: "panpan",
//     descr: "tata",
//     stock: 5,
//   },
// ];

// const generateId = () => {
//   const maxId =
//     articles.length > 0 ? Math.max(...articles.map((n) => n.id)) : 0;
//   return maxId + 1;
// };

// app.get("/", (request, response) => {
//   response.send("<h1>Hello World!</h1>");
// });

// app.get("/api/articles/:id", (request, response) => {
//   const article = articles.find((a) => a.id === Number(request.params.id));

//   if (article === null || article === undefined) {
//     return response.status(404).end();
//   }

//   return response.json(article);
// });

// app.put("/api/articles/:id", (request, response) => {
//   const body = request.body;
//   const idToUpdate = Number(request.params.id);

//   if (!body.name) {
//     return response.status(400).json({
//       error: "content missing",
//     });
//   }
//   const updatedArticle = {
//     id: idToUpdate,
//     name: body.name,
//     descr: body.descr,
//     stock: body.stock,
//   };

//   articles = articles.map((article) =>
//     article.id === idToUpdate ? updatedArticle : article
//   );

//   console.log(articles);

//   response.json(updatedArticle);
// });

// app.post("/api/articles", (request, response) => {
//   const body = request.body;

//   if (!body.name) {
//     return response.status(400).json({
//       error: "content missing",
//     });
//   }

//   const article = {
//     id: generateId(),
//     name: body.name,
//     descr: body.descr,
//     stock: body.stock,
//   };

//   articles = articles.concat(article);
//   response.json(article);
// });

// app.get("/api/articles", (request, response) => response.json(articles));

// app.delete("/api/articles/:id", (request, response) => {

//   if(request.params.id === undefined || request.params.id === null) {
//     return response.status(400).json({
//       error: "Id to delete missing",
//     });
//   }
  
//   const id = Number(request.params.id);


//   articles = articles.filter((article) => article.id !== id);
//   response.status(200).json({
//     info: "article deleted",
//   });
// });

// console.log("running....");
// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
