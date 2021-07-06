const path = require('path')
const fs = require('fs');
const concurrently = require('concurrently');
const dotenv = require('dotenv');
const { exit } = require('process');
const logger = require('./util/logging')

const requiredEnvironmentVariables = {
    TOKEN: String,
    MONGO_CONN_STR: String
}

// Check if dotenv is there
const dotenvPath = path.resolve(__dirname, "../", '.env')
if (! fs.existsSync(dotenvPath)) {
    logger.warn('.env file is missing, creating a new one with empty values')
    // Generate env file contents
    var envFileContents = ""
    for (var key in requiredEnvironmentVariables) {
        envFileContents += `${key}=\n`
    }
    fs.writeFileSync(dotenvPath, envFileContents, () => {})
    exit(1)
}

dotenv.config()

// Make sure we got all the keys we want
Object.keys(requiredEnvironmentVariables).forEach(k => {
    if (! (k in process.env)) {
        logger.error(k + ' has not been set in .env file!')
        exit(1)
    }
})

concurrently([
        { 
            command: "cd client && node  --trace-warnings bot.js", 
            name: "bot", 
            env: process.env
        },
        { 
            command: "cd server && node --trace-warnings server.js", 
            name: "server", 
            env: process.env
        }
    ], 
    {
        prefix: '[{time} process: {name}]',
        killOthers: ['success', 'failure'],
        restartTries: 0,
        cwd: __dirname,
    }
)