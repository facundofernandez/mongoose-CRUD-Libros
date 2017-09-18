module.exports = {
  port: process.env.PORT || 8000,
  db: process.env.MONGODB || 'mongodb://localhost:27017/baseTest',
  COLOR_LOGGER: {
    yellow: '\x1b[33m%s\x1b[0m',
    red: '\x1b[31m%s\x1b[0m'

  },
  SECRET_TOKEN: 'miclavedetokens'
}
