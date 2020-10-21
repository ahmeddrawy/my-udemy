const express = require('express')
const router = express.Router()
const courseController = require('../controllers/course.controller')

router.get('/', (req, res) => {
  res.render('home')
})

module.exports = router
