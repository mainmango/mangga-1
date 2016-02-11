const Promise = require('./promise')
const throat = require('throat')(Promise)

module.exports = function (concurrency = 1) {
  return throat(concurrency)
}
