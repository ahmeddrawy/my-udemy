const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://localhost:27017/MyUdemy',
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  (err) => {
    if (!err) {
      console.log('Successfully Connected in MongoDB')
    } else {
      console.log('Syntax Error: ' + err)
    }
  }
)

require('../models/course')
