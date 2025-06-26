const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(), // Show logs in terminal
    new winston.transports.File({ filename: 'security.log' }) // Save logs to a file
  ]
});

module.exports = logger;

