(function (App) {
    'use strict';

    App.UsersCollection = Backbone.Collection.extend({

        model: Backbone.Model,

        initialize: function () {
            this.startListening();
        },

        startListening: function () {
            var self = this;
            App.socket.on('usersReset', function (users) {
                self.reset(users);
            });
        },

        onRemove: function () {
            this.stopListening();
        }
    });
})(App);
