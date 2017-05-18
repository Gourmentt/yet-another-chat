'use strict';

module.exports = {
    store: {
        host: '127.0.0.1',
        port: 6379,
        ttl: 3600
    },
    session: {
        key: 'koa:sess'
    },
    passwordSalt: 'd139d13bvd813vd',
    onlineUsersStorage: 'online-users',
    assetsPath: './frontend',
    mongoDB: {
        host: '127.0.0.1',
        port: 27017,
        db: 'chat'
    }
};