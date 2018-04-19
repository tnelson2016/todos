require('dotenv').config()
const express = require('express')
const app = express()
const search = require('./lib/to-do-search')
const {
  propOr,
  compose,
  contains,
  head,
  last,
  split,
  prop,
  pathOr,
  filter
} = require('ramda')

//const port = process.env.PORT || 4000
const port = propOr(9999, 'PORT', process.env)

console.log('process.env.PORT', process.env.PORT)

const todos = [
  { id: 1, text: 'snore', completed: true },
  { id: 2, text: 'wake up', completed: false },
  { id: 3, text: 'drink coffee', completed: true },
  { id: 4, text: 'drive to class', completed: false },
  { id: 5, text: 'learn express', completed: true }
]

app.get('/', (req, res) => res.send('<h1>Welcome to the ToDos API</h1>'))
app.get('/todos', (req, res) => {
  if (pathOr(null, [`query`, `s`], req)) {
    const searchProp = compose(head, split(`:`), prop(`s`))(req.query)
    const searchValue = compose(last, split(`:`), prop(`s`))(req.query)
    res.send(filter(search(searchProp, searchValue), todos))
  } else {
    res.send(todos)
  }

  return
})

app.listen(port, () => console.log('TODOS API IS UP on port', port))
