(function (App) {
    'use strict';

    App.LoginView = Backbone.View.extend({

        events: {
            'submit .login-form': 'onLoginFormSubmit'
        },

        templates: {
            index: JST['frontend/templates/login/index.html']
        },

        initialize: function () {
            this.model = App.curUser;
            this.setElement(App.container);
            this.render();
        },

        render: function () {
            this.$el.html(this.templates.index({}));
            this.cacheViewElements();
        },

        cacheViewElements: function () {
            this.$passwordInput = this.$('[data-password]');
            this.$loginInput = this.$('[data-login]');
            this.$submitBtn = this.$('.login-form [type="submit"]');
        },

        onRemove: function () {
            this.stopListening();
            App.container.empty();
        },

        onLoginFormSubmit: function () {
            var login = this.$loginInput.val(),
                password = this.$passwordInput.val(),
                self = this;
            this.$submitBtn.button('loading');

            this.model.login(login, password).
                always(function () {
                    self.$submitBtn.button('reset');
                });

            return false;
        }
    });
})(App);
