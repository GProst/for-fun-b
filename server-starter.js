'use strict'

const express = require('express')
const app = express()
const compression = require('compression')
const path = require('path')
const morgan = require('morgan')
const winston = require('winston')

const apiRouter = require('./routers/api.router')

module.exports = function startServer() {
  app.use(morgan('combined'))
  app.use(compression({level: 9}))
  app.use('/', express.static(path.join(__dirname, 'assets')))

  app.use('/api', apiRouter, (req, res) => {
    res.sendStatus(404)
  })

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
  })

  app.listen(3001, () => {
    winston.info('Server listening on port 3001!')
  })
}
