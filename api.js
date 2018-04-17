const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => res.send('<h1> Welcome to the ToDos API</h1>'))

app.listen(4000, () => console.log('TODOS API is up on port', port))
