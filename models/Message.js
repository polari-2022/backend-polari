const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    date:{
        type:Date,
        required:true,
        default:Date.now,
    }, 
})

const Message = model('Message', messageSchema);

module.exports = Message;