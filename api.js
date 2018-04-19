require('dotenv').config()
const express = require('express')
const app = express()
const search = require('./lib/to-do-search')
const requirFieldChecker = require('./lib/check-req-fields')
const objClean = require('./lib/clean-object')
const HTTPError = require('node-http-error')

const {
  propOr,
  compose,
  contains,
  head,
  last,
  split,
  prop,
  pathOr,
  filter,
  add,
  sort,
  map,
  merge,
  not,
  isEmpty,
  join
} = require('ramda')

const bodyParser = require('body-parser')
const port = propOr(9999, 'PORT', process.env)

console.log('process.env.PORT', process.env.PORT)

const todos = [
  { id: 1, text: 'snore', completed: true },
  { id: 2, text: 'wake up', completed: false },
  { id: 3, text: 'drink coffee', completed: true },
  { id: 4, text: 'drive to class', completed: false },
  { id: 5, text: 'learn express', completed: true }
]

const todoRequiredFieldChecker = reqFieldChecker(['text'])

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('<h1>Welcome to the ToDos API</h1>'))

app.post('/todos', (req, res, next) => {
  const sorter = (a, b) => a - b
  const newID = compose(add(1), last, sort(sorter), map(todo => todo.id))(todos)

  const missingFields = todoRequiredFieldChecker(req.body)

  if (not(isEmpty(missingFields))) {
    const responseMessage = `Missing Fields: ${join(
      ' ',
      todoRequiredFieldChecker(req.body)
    )}`

    next(new HTTPError(400, responseMessage))
  }

  todos.push(merge(req.body, { id: newId }))
  res.status(201).send(newToDo)
  return
})

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

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.send(err.message)
})

app.listen(port, () => console.log('TODOS API IS UP on port', port))
