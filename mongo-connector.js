'use strict'

const winston = require('winston')
const MongoClient = require('mongodb').MongoClient

const dbUrl = 'mongodb://localhost:27017/GProstBlog'

let dataBase

module.exports.connectToMongoDB = function connectToMongoDB() {
  return MongoClient.connect(dbUrl)
    .then((db) => {
      winston.info('Connected successfully to GProstBlog database')
      dataBase = db
    })
    .catch((err) => {
      winston.error('error on connecting db')
      throw err
    })
}


module.exports.getDB = () => {
  return dataBase
}
