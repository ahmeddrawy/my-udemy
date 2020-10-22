const config = require('config')
const Course = require('../models/course')

module.exports = { showCourses: showCourses, seedCourses: seedCourses }

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
