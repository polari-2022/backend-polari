const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    text:{
       type: String,
       require:true, 
    },
    date:{
        type:Date,
        require:true,
        default:Date.now,
    },
})

const Message = model('Message', messageSchema);

module.exports =Message;