const memoize = require('lodash/memoize')
const got = require('got')

module.exports = memoize(got)
