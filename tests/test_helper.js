const Article = require('../models/article')

const initialArticles = [
  {
    name: 'Article 1',
    descr: 'Descr 1',
    stock: 99,
  },
  {
    name: 'Article 2',
    descr: 'Descr 2',
    stock: 99, 
 }
]

const nonExistingId = async () => {
  const article = new Article({ name: 'willbesavedandremoved', descr: 'Blabla3', stock: 56 })
  await article.save()
  await article.remove()

  return article._id.toString()
}

const articlesInDb = async () => {
  const articles = await Article.find({})
  return articles.map(article => article.toJSON())
}



module.exports = {
  initialArticles,
  nonExistingId,
  articlesInDb,

}