require('./startup/config')()
const app = require('./startup')
const winston = require('winston')
require('./startup/db')
require('./startup/logging')() /// logging is here to handle errors from routes and dbs

const port = process.env.PORT || 8080
app.listen(port, () => {
  winston.info(`listening to port ${port}`)
})
