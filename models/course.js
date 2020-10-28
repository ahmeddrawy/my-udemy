const mongoose = require('mongoose')
var Schema = mongoose.Schema
const Joi = require('joi')
const schema = new Schema({
  name: {
    type: String,
    require: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0
      },
      message: 'tags should be an array with min length 1',
    },
  },
})

const Course = mongoose.model('Course', schema)

module.exports = Course
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    tags: Joi.array(),
  })
  return schema.validate(course)
}

exports.validate = validateCourse
