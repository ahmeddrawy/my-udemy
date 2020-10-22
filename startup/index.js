const express = require('express')
const path = require('path')
const app = express()
const { login, home, logins, courses, users, genres } = require('../routes')
const err_middleware = require('../middleware/error')
const hbs = require('express-handlebars')

///============= routes =============

app.use(express.urlencoded({ extended: true }))
app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
    defaultLayout: 'main',
  })
)
app.set('view engine', 'hbs')
app.use(express.static('public'))
// app.use(express.json());
app.use('/home', home)
app.use('/login', login)
app.use('/api/courses', courses)
app.use('/api/genres', genres)
app.use('/api/users', users)
app.use('/api/logins', logins)
app.use(err_middleware)

module.exports = app
