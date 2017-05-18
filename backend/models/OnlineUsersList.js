'use strict';

const redis = require('redis'),
      config = require('../config/main.js');
let redisClient = redis.createClient(config.store);

module.exports = {

    add (login){
        return new Promise((resolve, reject) => {
            redisClient.sadd(config.onlineUsersStorage, login, (err, result) => {
                resolve(login);
            });
        });
    },

    remove (login){
        return new Promise((resolve, reject) => {
            redisClient.srem(config.onlineUsersStorage, login, (err, result) => {
                resolve(login);
            });
        });
    },

    getList (){
        return new Promise((resolve, reject) => {
            redisClient.smembers(config.onlineUsersStorage, (err, result) => {
                resolve(result.map((elem) => {
                    return {login: elem};
                }));
            });
        });
    },

    broadcast (io){
        return this.getList().then((users) => {
            io.broadcast('usersReset', users);
        });
    },
};