// const low = require('lowdb')
// const storage = require('lowdb/file-sync')
const pouchdb = require('pouchdb')

const path = require('path')
const dbpath = path.resolve(
  process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
  '.mangga.db'
  )

// const db = low(dbpath, {
//   storage
// })

const db = pouchdb(dbpath)

module.exports = db