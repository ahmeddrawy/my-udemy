const winston = require('winston')
require('winston-mongodb')
const db_URI = 'mongodb://localhost:27017/MyUdemy'
require('express-async-errors')

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  )
  // process.on('uncaughtException',(exc)=>{ /// todo handle with winston
  //     winston.error(exc.message,exc);
  //     console.log('we faced an internal error');
  //     // process.exit(1);
  // });

  process.on('unhandledRejection', (exc) => {
    throw exc
    // winston.error(exc.message,exc);
    // / todo we should terminate here but process.exit doesn't wait for the logging process
    // / we must wait for the streams to flush
  })
  /// to log errors in files
  winston.add(new winston.transports.File({ filename: 'logfile.log' }))
  /// to log errors in mongodb
  winston.add(
    new winston.transports.MongoDB({
      db: db_URI,
      options: { useUnifiedTopology: true },
    })
  )
}
