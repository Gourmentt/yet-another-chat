(function (App) {
    'use strict';

    App.ChatView = Backbone.View.extend({

        events: {
            'click #send-message-btn': 'sendMessage',
            'keydown #compose-message': 'sendMessageOnEnterKey'
        },

        templates: {
            index: JST['frontend/templates/chat/index.html'],
            message: JST['frontend/templates/chat/message.html'],
            singleUser: JST['frontend/templates/chat/user.html'],
        },

        initialize: function () {
            this.setElement(App.container);
            this.render();
            this.initUsersList();
            this.initMessaging();
            this.cacheViewElements();
        },

        render: function () {
            this.$el.html(this.templates.index({
                username: App.curUser.get('login')
            }));
        },

        cacheViewElements: function () {
            this.$messageComposer = this.$('#compose-message');
            this.$messagesList = this.$('.chat-view__messages');
            this.$usersList = this.$('.chat-view__users');
        },

        initMessaging: function () {
            this.messages = new App.MessagesCollection();
            this.listenTo(this.messages, 'add', this.renderMessage);
            this.listenTo(this.messages, 'reset', this.renderMessages);
            this.messages.populate();
        },

        initUsersList: function () {
            this.users = new App.UsersCollection();
            this.listenTo(this.users, 'reset', this.renderUsersList);
            App.curUser.fetch(); // if we come from login/register page, reset event already emitted, we need to emit it again
        },


        sendMessageOnEnterKey: function (e) {
            if (e.which !== 13) {
                return true;
            }
            this.sendMessage();
            e.preventDefault();
        },

        sendMessage: function () {
            var message = this.$messageComposer.val();
            if (message.length) {
                this.messages.sendMessage(message);
                this.$messageComposer.val('');
            }
        },


        renderMessages: function () {
            this.$messagesList.empty();
            this.messages.each(this.renderMessage, this);
        },

        renderMessage: function (message) {
            this.$messagesList.append(this.templates.message(message.attributes));
            this.scrollToBottom(this.$messagesList);
        },

        scrollToBottom: function ($elem) {
            $elem.scrollTop($elem.prop('scrollHeight'));
        },

        remove: function () {
            this.messages.onRemove();
            this.users.onRemove();
        },

        renderUsersList: function () {
            this.$usersList.empty();
            this.users.each(this.renderUser, this);
            this.scrollToBottom(this.$usersList);
        },

        renderUser: function (user) {
            this.$usersList.append(this.templates.singleUser(user.attributes));
        }

    });
})(App);
