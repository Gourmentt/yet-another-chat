'use strict';

let mongoose = require('mongoose'),
    userModel = require('../models/User'),
    models = exports.models = {
        existingUser: {
            login: 'Socrates',
            password: 'qwe123'
        },
        wrongPasswordUser: {
            login: 'Socrates',
            password: 'qwe1234'
        },
        newUser: {
            login: 'Gallileo',
            password: 'qwe123'
        }
    };

let User = mongoose.model('User');

exports.prepareModels = function () {
    return new Promise(async (resolve, reject) => {
        let existingUser = await User.findOne({login: models.existingUser.login});
        if(existingUser){
            resolve(existingUser);
        }
        let newUser = await new User({
            login: models.existingUser.login,
            password: userModel.getHashedString(models.existingUser.password)
        }).save();
        models.existingUser.id = newUser.id;
        resolve(newUser);
    })
};

exports.cleanupModels = function () {
    return new Promise(async (resolve, reject) => {
        await User.remove({login: models.existingUser.login})
            .catch(reject);
        await User.remove({login: models.newUser.login});
        resolve();
    });
};
