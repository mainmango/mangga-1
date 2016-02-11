const crypto = require('crypto')
const memoize = require('lodash/memoize')

module.exports = memoize(function (hashFunction = 'md5') {
  return memoize(
    text => crypto.createHash(hashFunction).update(text).digest('hex')
    )
})