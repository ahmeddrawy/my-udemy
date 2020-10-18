const app = require('./startup')
const winston = require('winston')

const port = process.env.PORT || 8080
app.listen(port, () => {
  winston.info(`listening to port ${port}`)
})
