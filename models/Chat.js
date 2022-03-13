const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
    text: {
        type: String,
        require: true,
    },
    date:{
        type:Date,
        require:true,
        default:Date.now,
    }, 
})

const Chat = model('Chat', chatSchema);

module.exports = Chat;