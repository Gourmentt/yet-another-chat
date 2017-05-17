(function (App) {
    'use strict';

    App.ChatView = Backbone.View.extend({

        events: {
            'click #send-message-btn': 'sendMessage',
            'keydown [data-new-message]': 'sendMessageOnEnterKey'
        },

        templates: {
            index: JST['frontend/templates/chat/index.html'],
            message: JST['frontend/templates/chat/message.html'],
        },

        initialize: function () {
            this.setElement(App.container);
            this.render();
            this.initMessagesSocket();
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
        },


        initMessagesSocket: function () {
            App.socket = new io();
        },

        initMessaging: function () {
            this.messages = new App.MessagesCollection();
            this.listenTo(this.messages, 'add', this.renderMessage);
            this.listenTo(this.messages, 'reset', this.renderMessages);
            this.messages.populate();
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
            this.scrollToLastMessage(this.$messagesList);
        },

        scrollToLastMessage: function () {
            this.$messagesList.scrollTop(this.$messagesList.prop('scrollHeight'));
        }

    });
})(App);
