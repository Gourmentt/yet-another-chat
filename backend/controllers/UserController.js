'use strict';

let User = require('../models/User'),
    OnlineUsersList = require('../models/OnlineUsersList');


let updateUserSession = function (session, user) {
    session.userId = user._id;
    session.authenticated = true;
    session.login = user.login;
};

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
        let {login, password} = ctx.request.body,
            user;
        try {
            user = await User.checkPassword(login, password);
        } catch (e){
            ctx.throw(e, 400);
            return;
        }

        updateUserSession(ctx.session, user);
        await OnlineUsersList.add(user.login);
        await OnlineUsersList.broadcast(ctx.app.io);
        console.log('User logged in: %s', user.login);

        ctx.body = user.toJSON();
    },

    logout: async function (ctx){
        let login = ctx.session.login;
        ctx.session = null;
        await OnlineUsersList.remove(login);
        await OnlineUsersList.broadcast(ctx.app.io);
        console.log('User logouted: %s', login);
        ctx.body = 'logouted';
    },

    register: async function (ctx) {
        let {login, password} = ctx.request.body,
            user;
        try {
            user = await User.register(login, password);
        } catch (e){
            ctx.throw(e, 400);
            return;
        }

        updateUserSession(ctx.session, user);
        await OnlineUsersList.add(user.login);
        await OnlineUsersList.broadcast(ctx.app.io);

        console.log('User registered: %s', user.login);
        ctx.body = user.toJSON();
    }

};