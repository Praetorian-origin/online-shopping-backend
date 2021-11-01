const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    name: String,
    descr: String,
    stock: Number,
})

articleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Article', articleSchema)

