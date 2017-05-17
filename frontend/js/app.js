(function () {
    'use strict';

    var Router = Backbone.Router.extend({

        routes: {
            ''        : 'chat',
            'chat'    : 'chat',
            'register': 'register',
            'login'   : 'login'
        },

        goToLoginPage: function () {
            this.navigate('login', {trigger: true});
        },
        goToChatPage: function () {
            this.navigate('chat', {trigger: true});
        }
    });

    window.App = {

        eventDispatcher: _.extend({}, Backbone.Events),
        router: new Router(),

        init: function () {
            this.container = $('#app-container');
            this.initEventDispatcher();
            this.initRouter();
            this.initUser();
        },

        //Initializers
        initEventDispatcher: function () {
            this.eventDispatcher.on('error', this.showError, this);
            this.eventDispatcher.on('register', this.onRegisterUser, this);
            this.eventDispatcher.on('login', this.onLoginUser, this);
        },
        initUser: function () {
            this.curUser = new this.UserModel();
            this.curUser.populate()
                .always(function () {
                    Backbone.history.start();
                });
        },
        initRouter: function () {
            this.router.on('route:chat', this.onChatNav, this);
            this.router.on('route:register', this.onRegisterNav, this);
            this.router.on('route:login', this.onLoginNav, this);
        },

        // navigation events
        onChatNav: function () {
            if (!this.isLoggedIn()) {
                this.router.goToLoginPage();
            } else {
                this.goToView(this.ChatView);
            }
        },
        onLoginNav: function () {
            if (!this.isLoggedIn()) {
                this.goToView(this.LoginView);
            } else {
                this.router.goToChatPage();
            }
        },
        onRegisterNav: function () {
            if (!this.isLoggedIn()) {
                this.goToView(this.RegistrationView);
            } else {
                this.router.goToChatPage();
            }
        },
        goToView: function (View) {
            if (this.currentView) { this.currentView.$el.unbind(); }
            this.currentView = new View();
        },

        isLoggedIn: function () {
            return this.curUser.isLoggedIn();
        },

        // Callbacks for user actions
        onRegisterUser: function () {
            this.logSuccess('Registration complete, navigating to chat');
            this.router.goToChatPage();
        },
        onLoginUser: function () {
            this.logSuccess('Login successful, navigating to chat');
            this.router.goToChatPage();
        },

        // Error and success messages handling
        showError: function (jqXHR) {
            var messageFromJqXHR = jqXHR.responseJSON && jqXHR.responseJSON.message,
                message = message || jqXHR.status || 'Error happened, please refresh page';
            this.logError(message);
        },
        logError: function (message) {
            toastr.error(message);
        },
        logSuccess: function (message) {
            toastr.success(message);
        }
    };

    $(function () {
        App.init();
    });
})();
