'use strict'

const connectToMongoDB = require('./mongo-connector')
const startServer = require('./server-starter')

connectToMongoDB()
  .then(startServer)

