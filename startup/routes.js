const express = require('express');
const courses = require('../routes/courses');
const genres = require('../routes/genres');
const users = require('../routes/users');
const logins = require('../routes/logins');
const err_middleware = require('../middleware/error');

///============= routes =============
module.exports = function(app){
    app.use(express.json());
    app.use('/api/courses',courses);
    app.use('/api/genres',genres);
    app.use('/api/users',users);
    app.use('/api/logins',logins);
    app.use(err_middleware);
}
