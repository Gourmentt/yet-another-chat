(function (App) {
    'use strict';

    App.ChatView = Backbone.View.extend({

        templates: {
            index: JST['frontend/templates/chat/index.html'],
        },

        initialize: function () {
            this.setElement(App.container);
            this.render();
        },

        render: function () {
            this.$el.html(this.templates.index({username: App.curUser.get('login')}));
        }
    });
})(App);
