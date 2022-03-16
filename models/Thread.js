const { Schema, model } = require('mongoose');

const threadSchema = new Schema({
    text:{
       type: String,
       required:true, 
    },
    date:{
        type:Date,
        required:true,
        default:Date.now,
    },
})

const Thread = model('Thread', threadSchema);

module.exports = Thread;
