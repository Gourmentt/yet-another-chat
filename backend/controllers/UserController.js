'use strict';

var User = require('../models/User'),
    OnlineUsersList = require('../models/OnlineUsersList');

module.exports = {

    getCurrentUser: async function (ctx, next) {
        var userId = ctx.session.userId;

        let user = await User.findById(userId);
        if(user.login) {
            await OnlineUsersList.add(user.login);
            await OnlineUsersList.broadcast(ctx.app.io);
        }
        ctx.body = user;
    },

    login: async function (ctx) {
        let reqBody = ctx.request.body,
            login = reqBody.login,
            password = reqBody.password;

        try{
            var user = await User.checkPassword(login, password);
            ctx.body = User.authenticate(user, ctx);
            await OnlineUsersList.add(user.login);
            await OnlineUsersList.broadcast(ctx.app.io);
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

        await OnlineUsersList.add(user.login);
        await OnlineUsersList.broadcast(ctx.app.io);

        ctx.body = userFormatted;
    }

};
