'use strict';

let mongoose = require('mongoose'),
    crypto = require('crypto'),
    userSchema = mongoose.Schema({
        login: String,
        password: String
    });
userSchema.methods.toJSON = function(){
    return {
        id: this._id,
        login: this.login
    }
};
let User = mongoose.model('User', userSchema);

module.exports = {

    async findById (id) {
        let user = await User.findOne({'_id': id});
        if(user) {
            return user.toJSON()
        } else {
            return {}
        }
    },

    async register (login, password) {
        let user = await User.findOne({login});
        if(user){
            throw new Error('User with this login already exists');
        }
        let newUser = new User({login, password: this.getHashedString(password)});
        return newUser.save();
    },

    async checkPassword (login, password){
        let user = await User.findOne({login});
        if(!user){
            throw new Error('User not found!');
        }
        if(this.getHashedString(password) === user.password) {
            return user;
        } else {
            throw new Error('Login or password incorrect');
        }
    },

    getHashedString(string){
        let hasher = crypto.createHash('sha256');
        hasher.update(string + global.config.passwordSalt);
        return hasher.digest('hex');
    }

};