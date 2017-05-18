'use strict';

let mongoose = require('mongoose'),
    messageSchema = mongoose.Schema({
        text: String,
        author: String,
        created: {
            type: Date,
            default: Date.now
        }
    }),
    Message = mongoose.model('Message', messageSchema);

module.exports = {

    save(message){
        let newMessage = {
            text: message.text,
            author: message.author.login,
            created: Date.now()
        };
        return new Message(newMessage).save();
    },

    getLastMessages(number = 100){
        return Message.find().
                sort({'created': 'asc'}).
                limit(number).
                then((messages) => {
                    if(!messages.length){
                        return [];
                    }
                    return messages;
                });
    }

};