require('dotenv').config()
const express = require('express')
const app = express()
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
  { id: 1, text: 'Wake up', completed: true },
  { id: 2, text: 'Drink coffee', completed: true },
  { id: 3, text: 'Drive to class', completed: true },
  { id: 4, text: 'Learn Express', completed: true }
]

app.get('/', (req, res) => res.send('<h1>Welcome to the ToDos API</h1>'))
app.get('/todos', (req, res) => {
  // GET /todos?s=text:teach
  // req.query.s   // => `text:teach`

  const isQuery = pathOr(null, ['query', 's'], req)

  if (isQuery) {
    const searchProp = compose(head, split(':'), prop('s'))(req.query)
    const searchValue = compose(last, split(':'), prop('s'))(req.query)

    //searchProp  // => 'text'
    //searchValue // => 'teach'
    console.log('searchProp', searchProp)
    console.log('searchValue', searchValue)

    var searchedToDos = []

    function search(todo) {
      return compose(contains(searchValue), split(' '))(todo[searchProp])
    }

    searchedToDos = filter(search, todos)

    res.send(searchedToDos)
  } else {
    res.send(todos)
  }

  return
})

app.listen(port, () => console.log('TODOS API IS UP on port', port))
