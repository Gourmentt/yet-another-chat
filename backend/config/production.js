/**
 * Use only env variables to set urls and any private data releated to deployment that shouldn't be in repo
 */

module.exports = {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    ttl: 3600
  },
  mongoDB: {
    uri: process.env.MONGO_URL
  },
  session: {
    key: 'koa:sess'
  },
  passwordSalt: process.env.PASSWORD_SALT,
  onlineUsersStorage: {
    key: 'online-users'
  },
  frontendPath: './frontend',
  appPort: 80
};