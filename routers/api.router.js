'use strict'

const express = require('express')
const {getDB} = require('../mongo-connector')
const router = express.Router()

module.exports = router

router.get('/post/:slug', (req, res, next) => {
  const {slug} = req.params
  const db = getDB()
  const posts = db.collection('posts')
  posts.findOne({slug}, {frontImage: true, mainContent: true, title: true, slug: true})
    .then(post => {
      if (!post) {
        next()
      } else {
        res.json({data: post})
      }
    })
})

router.get('/posts/page/:pageNumber', (req, res, next) => {
  const {pageNumber} = req.params
  const offset = 3 * (pageNumber - 1)
  const limit = 3
  const db = getDB()
  const posts = db.collection('posts')
  posts.find({notInPostList: {$ne: true}}, {thumbnail: true, title: true, description: true, slug: true})
    .skip(offset).limit(limit).toArray()
    .then(posts => {
      if (!posts) {
        next()
      } else {
        res.json({data: posts})
      }
    })
})
