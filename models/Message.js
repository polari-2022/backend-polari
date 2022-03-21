const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    text: {
        type: String,
        require: true,
    },
    date:{
        type:Date,
        require:true,
        default:Date.now,
    }, 
    thread:{
        type:Schema.Types.ObjectId,
        ref:'Thread'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

const Message = model('Message', messageSchema);

module.exports = Message;