'use strict';

module.exports = function (app) {
    let Router             = require('koa-router'),
        messagesController = require('../controllers/MessagesController'),
        userController     = require('../controllers/UserController'),
        router = new Router();

    router
        .get('/', messagesController.chat)
        .get('/user', userController.getCurrentUser)
        .post('/login', userController.login)
        .post('/register', userController.register)
        .get('/messages', messagesController.fetchMessages)
        .post('/messages', messagesController.addNewMessage);

    app
        .use(router.routes())
        .use(router.allowedMethods())
};