'use strict'

const winston = require('winston')
const MongoClient = require('mongodb').MongoClient

const dbUrl = 'mongodb://localhost:27017/myTestDatabase'

module.exports = function connectToMongoDB() {
  return MongoClient.connect(dbUrl)
    .then((db) => {
      winston.info('Connected successfully to MongoDB server')
      return db
    })
    .catch((err) => {
      winston.error('error on connecting db')
      throw err
    })
}
