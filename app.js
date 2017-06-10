'use strict'

const express = require('express')
const app = express()
const compression = require('compression')
const path = require('path')
const morgan = require('morgan')
const winston = require('winston')

const MongoClient = require('mongodb').MongoClient

// Connection URL
const dbUrl = 'mongodb://localhost:27017/myTestDatabase'

// Use connect method to connect to the server
MongoClient.connect(dbUrl, function(err, db) {
  if (err) {
    winston.error('error on connecting db', err)
  }
  winston.info('Connected successfully to MongoDB server')

  // Get the documents collection
  const collection = db.collection('myCollection')
  // Find some documents
  collection.find({}).toArray((err, docs) => {
    winston.info('Found the following records')
    winston.info(docs)

    db.close()
  })
})


app.use(morgan('combined'))
app.use(compression({level: 9}))
app.use('/', express.static(path.join(__dirname, 'assets')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(3000, () => {
  winston.info('Server listening on port 3000!')
})
