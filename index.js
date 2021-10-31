const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())


let articles = [
    {
        "id": 2,
        "descr": "Browser can execute only JavaScript",
        "name": "Browser",
        "stock": 2
      },
      {
        "id": 3,
        "descr": "GET and POST are the most stock methods of HTTP protocol",
        "name": "GET AND Post",
        "stock": 51
      },
      {
        "id": 5,
        "name": "panpan",
        "descr": "tata",
        "stock": 5
      }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



