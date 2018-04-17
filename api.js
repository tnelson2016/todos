const express = require('express')
const app = express()
const port = 4000

console.log('process.env', process.env)

const todos = [
  { id: 1, text: 'Wake up', completed: false },
  { id: 2, text: 'Drink Coffee', completed: false },
  { id: 3, text: 'Learn express', completed: false }
]

app.get('/', (req, res) => res.send('<h1> Welcome to the ToDos API</h1>'))

app.get('/todos', (req, res) => res.send(todos))

app.listen(4000, () => console.log('TODOS API is up on port', port))
