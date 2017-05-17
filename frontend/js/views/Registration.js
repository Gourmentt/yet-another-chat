(function (App) {
    'use strict';

    App.RegistrationView = Backbone.View.extend({

        events: {
            'submit .registration-form': 'onRegisterFormSubmit'
        },

        templates: {
            index: JST['frontend/templates/registration/index.html']
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
            this.$submitBtn = this.$('.register-form [type="submit"]');
            this.$loginInput = this.$('[data-login]');
            this.$passwordInput = this.$('[data-password]');
        },

        onRemove: function () {
            this.stopListening();
            App.container.empty();
        },

        onRegisterFormSubmit: function () {
            var login = this.$loginInput.val(),
                password = this.$passwordInput.val(),
                self = this;
            this.$submitBtn.button('loading');

            this.model.register(login, password).
                always(function () {
                    self.$submitBtn.button('reset');
                });

            return false;
        }
    });
})(App);
