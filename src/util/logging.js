const winston = require('winston')

module.exports = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'info'
        }),
        new winston.transports.File({
            level: 'error',
            filename: '../logs/errors.log'
        })
    ]
})