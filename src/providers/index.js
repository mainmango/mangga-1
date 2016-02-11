const memoize = require('lodash/memoize')

const throttle = require('../throttle')
const http = require('../http')
const Promise = require('../promise')

const activeProviders = ['mangapanda']

var api =  memoize((providerName, concurrency = 5) => {
  const targetProviderName = providerName.toLowerCase()

  if (~activeProviders.indexOf(targetProviderName)) {
    const _throttle = throttle(concurrency)
    return require(`./${targetProviderName}`)(_throttle, http, Promise)
  }

  // :: else
  throw new Error('Provider is not valid.')
})

api.available = _ => activeProviders

module.exports = api
