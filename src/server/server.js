const express = require('express')
const mongo = require('./mongo.js')
const logger = require('../util/logging')

const app = express()
const port = 8081

// app setup
app.use(express.json())

// setup endpoints

const server = app.listen(port, () => {
  logger.info(`Listening at http://localhost:${port}`)
})

process.on('SIGTERM', () => {
  logger.info('Received kill signal, shutting down gracefully');
  server.close()
})