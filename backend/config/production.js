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
        store: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            ttl: 3600,
            db: 'chat',
            options: {
                auth_pass: process.env.REDIS_PASSWORD,
            }
        },
        key: 'koa:sess'
    },
    passwordSalt: process.env.PASSWORD_SALT,
    onlineUsersStorage: {
        key: 'online-users'
    },
    frontendPath: './frontend',
    appPort: process.env.PORT
};