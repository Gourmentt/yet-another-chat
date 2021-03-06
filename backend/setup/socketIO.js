'use strict';

const redis = require('redis'),
      config = global.config,
      cookie = require('cookie'),
      IO = require('koa-socket'),
      OnlineUsersList = require('../models/OnlineUsersList');

let io = new IO(),
    redisClient = redis.createClient(config.redis);

module.exports = function (app) {

    io.attach(app);

    io.on('disconnect', async (ctx, data) => {
        let userData = ctx.socket.socket.userData;
        if(typeof userData == 'undefined'){
            return true;
        }
        await OnlineUsersList.remove(userData.login);
        await OnlineUsersList.broadcast(app.io);
    });

    // fill socket.userData with login to be able to remove user from storage on 'disconnect'
    io.on('connection', async (ctx, data) => {
        let headers = ctx.socket.handshake.headers,
            cookies = cookie.parse(headers.cookie);
        if(!cookies[config.session.key]){
            return true;
        }

        let sessionKey  = cookies[config.session.key],
            sessionData = await getSessionData(sessionKey);
        ctx.socket.userData = {login: sessionData.login};
    });


    function getSessionData(sessionKey) {
        return new Promise((resolve, reject) => {
            redisClient.get(sessionKey, (err, sessionData) => {
                let sessionDataParsed = JSON.parse(sessionData);
                if (typeof sessionDataParsed.login == 'undefined') {
                    resolve(null);
                }
                resolve(sessionDataParsed);
            });
        });
    }

};