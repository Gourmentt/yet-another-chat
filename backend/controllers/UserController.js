'use strict';

var User = require('../models/User');

module.exports = {

    getCurrentUser: async function (ctx, next) {
        var userId = ctx.session.userId;

        User.broadcastOnlineUsers(ctx.app._io);
        ctx.body = await User.findById(userId);
    },

    login: async function (ctx) {
        var reqBody = ctx.request.body,
            login = reqBody.login,
            password = reqBody.password;

        try{
            var user = await User.checkPassword(login, password);
            ctx.body = User.authenticate(user, ctx);
            User.broadcastOnlineUsers(ctx.app._io);
        } catch (err){
            ctx.body = {message: err.message};
            ctx.response.status = 500;
        }
    },

    register: async function (ctx) {
        var reqBody = ctx.request.body,
            login = reqBody.login,
            password = reqBody.password,
            user = await User.register(login, password),
            userFormatted = User.authenticate(user, ctx);
        User.broadcastOnlineUsers(ctx.app._io);
        ctx.body = userFormatted;
    }

};
