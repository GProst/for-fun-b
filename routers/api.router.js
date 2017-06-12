'use strict'

const express = require('express')
const {getDB} = require('../mongo-connector')
const router = express.Router()

module.exports = router

// a middleware function with no mount path. This code is executed for every request to the router
router.get('/post/:slug', (req, res, next) => {
  const {slug} = req.params
  const db = getDB()
  const posts = db.collection('posts')
  posts.findOne({slug})
    .then(post => {
      if (!post) {
        next()
      } else {
        res.json(post)
      }
    })
})
