const config = require('config')
const { x } = require('joi')
const Course = require('../models/course')

module.exports = { showCourses: showCourses, seedCourses: seedCourses }

//render all courses
function showCourses(req, res) {
  Course.find()
    .exec()
    .then((courses) => {
      res.render('home', { courses: courses })
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
}

function seedCourses(req, res) {
  const seedCourses = [
    { name: 'Learn HTML', tags: ['code', 'beginner', 'HTML'] },
    { name: 'Learn CSS', tags: ['code', 'beginner', 'CSS'] },
    { name: 'Learn Javascript', tags: ['code', 'beginner', 'Javasript'] },
    { name: 'Learn React', tags: ['code', 'beginner', 'React'] },
    { name: 'Learn Vue', tags: ['code', 'beginner', 'Vue'] },
  ]

  for (course of seedCourses) {
    var newCourse = new Course(course)
    newCourse.save()
  }

  res.send('courses seeded')
}
