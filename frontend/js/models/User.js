(function (App) {
    'use strict';

    App.UserModel = Backbone.Model.extend({

        url: '/user',
        loginUrl: '/login',
        logoutUrl: '/logout',
        registerUrl: '/register',

        login: function (login, password) {
            var self = this;

            return $.post(this.loginUrl, {login: login, password: password}, function (result) {
                self.set(result);
                App.eventDispatcher.trigger('login');
            }).fail(this.onRequestFail);
        },

        register: function (login, password) {
          var self = this;

          return $.post(this.registerUrl, {login: login, password: password}, function (result) {
              self.set(result);
              App.eventDispatcher.trigger('register');
          }).fail(this.failHandler);
        },

        logout: function () {
            var self = this;
            return $.post(this.logoutUrl, function () {
                self.clear();
                App.router.goToLoginPage();
            });
        },

        failHandler: function (jqXHR) {
            App.eventDispatcher.trigger('error', jqXHR);
        },

        isLoggedIn: function () {
            return this.get('id') != null;
        }
    });
})(App);
