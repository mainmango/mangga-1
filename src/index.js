// const db = require('./db')
// const log = require('./logger')

// var provider = require('./providers')('mangapanda', 5)
// var task

// provider.getLibrary()
//   .then(items => {
//     task = log.add('Update local catalog.')
//       .status('Syncing')
//       .details('Writing to local database')

//     return db.bulkDocs(items)
//   })
//   .then(_ => {
//     task.details(`${_.length} records synced`).done('Synced')
//   })

const update = require('./cmd/update')
update()