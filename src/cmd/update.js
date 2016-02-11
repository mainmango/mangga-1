const intersect = require('lodash/intersection')
const union = require('lodash/union')
const unique = require('lodash/uniq')
const reject = require('lodash/reject')
const includes = require('lodash/includes')

const db = require('../db')
const log = require('../logger')
const provider = require('../providers')

/**
 *  Update local catalog's manga listings
 *
 *  updateCmd([ 'mangapanda', 'mangafox' ], { quiet: true })
 */

function updateCmd (providers) {
  const _providers = !!providers && providers.length
    ? intersect(providers, provider.available())
    : provider.available()

  const task = log.add('Updating local catalog')
    .status('Waiting')
    .details(`${ _providers.length } providers`)

  Promise.all(_providers
    .map(p => provider(p, 5))
    .map(p => {
      return p.getLibrary()
    })
  )
  .then(results => {
    task.status('Running')
    return union.apply(this, results)
  })
  .then(results => {
    const ids = unique(results.map(r => r._id))
    task.details(`Analyzing ${ ids.length } uniques from ${ results.length } records`)

    return db.allDocs({
      include_docs: false,
      keys : ids
    })
    .then(response => response.rows.filter(r => !r.error))
    .then(records => records.map(r => r.id))
    .then(existingIds => reject(results, r => includes(existingIds, r._id)))
  })
  .then(filteredResults => {
    task.details(`Updating ${ filteredResults.length } records`)
    return db.bulkDocs(filteredResults)
  })
  .then(_ => {
    task.done().details('Local catalog updated.')
  })
}

module.exports = updateCmd