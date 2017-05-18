'use strict';

let User = require('../models/User'),
    OnlineUsersList = require('../models/OnlineUsersList');

module.exports = {

    getCurrentUser: async function (ctx, next) {
        let user = await User.findById(ctx.session.userId);
        if(user.login) {
            await OnlineUsersList.add(user.login);
            await OnlineUsersList.broadcast(ctx.app.io);
        }
        ctx.body = user;
    },

    login: async function (ctx) {
        let {login, password} = ctx.request.body;

        try{
            let user = await User.checkPassword(login, password);

            updateUserSession(ctx.session, user);
            await OnlineUsersList.add(user.login);
            await OnlineUsersList.broadcast(ctx.app.io);

            ctx.body = user.toJSON();
        } catch (err){
            ctx.body = {message: err.message};
            ctx.response.status = 500;
        }
    },

    register: async function (ctx) {
        let {login, password} = ctx.request.body,
            user = await User.register(login, password);

        updateUserSession(ctx.session, user);
        await OnlineUsersList.add(user.login);
        await OnlineUsersList.broadcast(ctx.app.io);

        ctx.body = user.toJSON();
    }

};

var updateUserSession = function (session, user) {
    session.userId = user._id;
    session.authenticated = true;
    session.login = user.login;
};