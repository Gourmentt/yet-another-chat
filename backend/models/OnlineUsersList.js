'use strict';

const redis = require('redis'),
      config = global.config;
let redisClient = redis.createClient(config.redis);

module.exports = {

    add (login){
        return new Promise((resolve, reject) => {
            redisClient.sadd(config.onlineUsersStorage.key, login, (err, result) => {
                resolve(login);
            });
        });
    },

    remove (login){
        return new Promise((resolve, reject) => {
            redisClient.srem(config.onlineUsersStorage.key, login, (err, result) => {
                resolve(login);
            });
        });
    },

    getList (){
        return new Promise((resolve, reject) => {
            redisClient.smembers(config.onlineUsersStorage.key, (err, result) => {
                const users = result.map((login) => ({login}));
                resolve(users);
            });
        });
    },

    broadcast (io){
        return this.getList().then((users) => {
            io.broadcast('usersReset', users);
        });
    },
};