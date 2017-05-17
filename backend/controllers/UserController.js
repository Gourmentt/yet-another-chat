'use strict';

var User = require('../models/User');

module.exports = {

    getCurrentUser: function (ctx, next) {
        var userId = ctx.session.userId;
        return User.findById(userId)
            .then((user) => {
                ctx.body = user;
            })
            .catch((err) => {
                ctx.response.status=500;
                ctx.body = err;
            });
    },

    login: async function (ctx) {
        var reqBody = ctx.request.body,
            login = reqBody.login,
            password = reqBody.password;

        try{
            var user = await User.checkPassword(login, password);
            ctx.body = User.authenticate(user, ctx);
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
        ctx.app._io.emit('users', userFormatted);
        ctx.body = userFormatted;
    }

};
