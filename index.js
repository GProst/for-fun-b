'use strict'

const winston = require('winston')

const {connectToMongoDB} = require('./mongo-connector')
const startServer = require('./server-starter')

connectToMongoDB()
  .then(startServer)
  .catch(err => {
    winston.error(err)
  })

