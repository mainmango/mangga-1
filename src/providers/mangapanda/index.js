const cheerio = require('cheerio')
const map = require('lodash/map')
const chalk = require('chalk')

const id = require('../../hash')('md5')
const log = require('../../logger')

const settings = {
  rootUrl: 'http://www.mangapanda.com'
}

var createProvider = function (throttle, http) {
  let api = {}

  /**
   * Get all manga offerings through this provider.
   * @return {Array}
   */
  api.getLibrary = function () {
    return throttle(_ => {

      const task = log
        .add(`Querying ${ chalk.bold.cyan('mangapanda') } server`)
        .status('Downloading')
        .details('Contacting server')

      return http(`${settings.rootUrl}/alphabetical`)
        .then(response => {
          task
            .status('Running')
            .details('Preparing')
          return cheerio.load(response.body)
        })
        .then($ => {
          task.details('Parsing records')
          return $('ul.series_alpha li')
        })
        .then(items => map(items, item => {
          const element = cheerio(item)
          const link = element.find('a')

          return {
            // :: PK
            _id : id(link.text()),
            // :: name
            n: link.text(),
            // :: provider
            p: 'mangapanda',
            // :: url
            u: link.attr('href'),
            // :: is completed
            c: element.has('span.mangacompleted').length
          }
        }))
        .then(items => {
          task.details(`${ items.length } manga found`).done()
          return items
        })
      }
    )
  }

  return api
}

module.exports = createProvider
