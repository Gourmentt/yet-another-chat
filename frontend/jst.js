this["JST"] = this["JST"] || {};

this["JST"]["frontend/templates/chat/index.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="chat-view">\n    <div class="chat-view__left-panel">\n        <div class="chat-view__messages"></div>\n        <div class="chat-view__compose">\n            <textarea id="compose-message" class="no-outline" placeholder="Enter your message here"></textarea>\n            <button type="button" title="Send message" class="no-outline chat-view__send-message-btn" id="send-message-btn">\n                <i class="fa fa-paper-plane-o fa-2x"></i>\n            </button>\n        </div>\n    </div>\n    <div class="chat-view__right-panel">\n        <div class="chat-view__login-panel">\n            <span>You are logged in as: <strong>' +
__e( username ) +
'</strong></span>\n        </div>\n        <div class="chat-view__users">No users online</div>\n    </div>\n</div>';

}
return __p
};

this["JST"]["frontend/templates/chat/message.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="chat-view__message ' +
__e( yourMessage ? 'chat-view__message--yours' : '' ) +
'">\n  <div class="chat-view__message-body">\n    <div class="chat-view-message__heading">\n      <span class="chat-view-message__author" title="' +
__e( author ) +
'" data-toggle="tooltip">\n        ' +
__e( author ) +
'\n      </span>\n      <span title="' +
__e( created ) +
'" class="chat-view-message__created" data-toggle="tooltip">\n        ' +
__e( created ) +
'\n      </span>\n    </div>\n    <div class="clearfix"></div>\n    <div class="chat-view-message__body">' +
__e( text ) +
'</div>\n  </div>\n</div>\n';

}
return __p
};

this["JST"]["frontend/templates/login/index.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="valign-wrapper">\n    <div class="valign-content">\n        <div class="panel panel-default login-form generic-form generic-form--centered">\n            <div class="panel-heading">Welcome to the Chat App!</div>\n            <div class="panel-body">\n                <div class="col-sm-offset-2 login-form__reminder">This app requires an user account\n                    <a href="#register" class="btn btn-link">I don\'t have an account</a>\n                </div>\n\n                <form class="form-horizontal" data-form>\n                    <div class="form-group">\n                        <label for="user-email" class="col-sm-2 control-label">Login</label>\n                        <div class="col-sm-8">\n                            <input type="text" class="form-control" id="user-email" placeholder="Login" data-login\n                                   required>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label for="user-password" class="col-sm-2 control-label">Password</label>\n                        <div class="col-sm-8">\n                            <input type="password" class="form-control" id="user-password" placeholder="Password"\n                                   data-password required>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <div class="col-sm-offset-2 col-sm-8 text-right">\n                            <button type="submit" class="btn btn-success" data-submit data-loading-text="Processing...">\n                                Login\n                            </button>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>';

}
return __p
};

this["JST"]["frontend/templates/registration/index.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="valign-wrapper">\n    <div class="valign-content">\n        <div class="panel panel-default registration-form generic-form generic-form--centered">\n            <div class="panel-heading">Welcome to the Chat App!</div>\n            <div class="panel-body">\n                <div class="col-sm-offset-2 login-form__reminder">This app requires an user account\n                    <a href="#login" class="btn btn-link">I\'m already have an account</a>\n                </div>\n\n                <form class="form-horizontal" data-form>\n                    <div class="form-group">\n                        <label for="user-email" class="col-sm-2 control-label">Login</label>\n                        <div class="col-sm-8">\n                            <input type="text" class="form-control" id="user-email" placeholder="Login" data-login\n                                   required>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <label for="user-password" class="col-sm-2 control-label">Password</label>\n                        <div class="col-sm-8">\n                            <input type="password" class="form-control" id="user-password" placeholder="Password"\n                                   data-password required>\n                        </div>\n                    </div>\n                    <div class="form-group">\n                        <div class="col-sm-offset-2 col-sm-8 text-right">\n                            <button type="submit" class="btn btn-success" data-loading-text="Processing...">Register\n                                me\n                            </button>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>\n';

}
return __p
};