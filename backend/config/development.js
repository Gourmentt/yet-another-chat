'use strict';

module.exports = {
    redis: {
        host: '127.0.0.1',
        port: 6379,
        ttl: 3600
    },
    mongoDB: {
        uri: 'mongodb://127.0.0.1:27017/chat'
    },
    session: {
        store: {
            host: '127.0.0.1',
            port: 6379,
            ttl: 3600,
            options: {
                password: ''
            }
        },
        key: 'koa:sess'
    },
    passwordSalt: 'd139d13bvd813vd',
    onlineUsersStorage: {
        key: 'online-users'
    },
    frontendPath: './frontend',
    appPort: 3000
};