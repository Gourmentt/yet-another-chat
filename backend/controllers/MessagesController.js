'use strict';

var User = require('../models/User'),
    Message = require('../models/Message');

module.exports = {

    // start page of app
    chat: function (ctx) {
        return ctx.render('./app')
    },

    fetchMessages: async function (ctx, next) {
        ctx.body = await Message.getLastMessages();
    },

    addNewMessage: async function (ctx) {
        var body = ctx.request.body,
            message = {
                text: body.text,
                author: await User.findById(ctx.session.userId)
            };
        message = await Message.save(message);
        ctx.app._io.emit('messageAdded', message);
        ctx.body = 'ok';
    }

};
