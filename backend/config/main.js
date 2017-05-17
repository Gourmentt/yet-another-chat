'use strict';

module.exports = {
    session: {
        key: 'koa:sess',
        maxAge: 86400000,
        overwrite: true,
        httpOnly: true,
        signed: true
    },
    assetsPath: './frontend',
    mongoDB: {
        host: '127.0.0.1',
        port: 27017,
        db: 'chat'
    }
};