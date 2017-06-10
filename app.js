'use strict'

const express = require('express')
const app = express()
const compression = require('compression')
const path = require('path')

app.use(compression({level: 9}))
app.use('/', express.static(path.join(__dirname, 'assets')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(3000, () => {
  console.log('Server listening on port 3000!')
})
