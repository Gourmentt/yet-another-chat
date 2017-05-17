(function (App) {
    'use strict';

    App.MessageModel = Backbone.Model.extend({

        parse: function (message) {
            // enrich for better design
            message.yourMessage = this.yourMessage(message.author);
            message.created = this.convertCreated(message.created);
            return message;
        },


        yourMessage: function (author) {
            return App.curUser.get('login') === author;
        },

        convertCreated: function (created) {
            var date = new Date(created);
            return date.toLocaleTimeString();
        }
    })
})(App);
