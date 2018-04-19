const { difference, keys } = require('ramda')

module.exports = requiredFields => data =>
  difference(requriedFields, keys(todo))
