(function (App) {
    'use strict';

    App.MessagesCollection = Backbone.Collection.extend({

        url: '/messages',

        model: App.MessageModel,

        initialize: function () {
            this.startListening();
        },

        populate: function () {
            var self = this;
            $.get(this.url, function (response) {
                self.reset(response, {parse: true});
            })
        },

        sendMessage: function (message) {
            $.post(this.url, {text: message});
        },

        startListening: function () {
            var self = this;
            App.socket.on('messageAdded',
                function (message) {
                    var model = new self.model(message, {parse: true});
                    self.add(model);
                });
        },

        onRemove: function () {
            this.stopListening();
        }
    });
})(App);
