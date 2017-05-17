'use strict';

var mongoose = require('mongoose'),
    crypto = require('crypto');

var userSchema = mongoose.Schema({
    login: String,
    password: String
});
userSchema.methods.toJSON = function(){
    return {
        id: this._id,
        login: this.login
    }
};
var User = mongoose.model('User', userSchema);

module.exports = {

    findById (id) {
        return User.findOne({'_id': id}).then((user) => {
            if(user) {
                return user.toJSON()
            } else {
                return {}
            }
        });
    },

    register (login, password) {
        var newUser = new User({login: login, password: this.getMD5(password)});
        return newUser.save();
    },

    getAll (){
        return User.find();
    },

    authenticate (user, ctx){
        ctx.session.userId = user._id;
        ctx.session.authenticated = true;

        return user.toJSON();
    },

    broadcastOnlineUsers (io){
        return this.getAll().then((users) => {
            let usersData = users.map((user) => {
                return {login: user.login}
            });
            io.emit('usersReset', usersData)
        });
    },

    checkPassword(login, password){
        var self = this;
        return User.findOne({'login': login}).then((user) => {
            if(!user){
                throw new Error('User not found!');
            }
            if(self.getMD5(password) === user.password) {
                return user;
            } else {
                throw new Error('Login or password incorrect');
            }
        })
    },

    getMD5(string){
        var md5sum = crypto.createHash('md5');
        md5sum.update(string);
        return md5sum.digest('hex');
    }

};