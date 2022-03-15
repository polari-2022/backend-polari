const { Schema, model } = require('mongoose');

const threadSchema = new Schema({
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

const Thread = model('Thread', threadSchema);

module.exports = Thread;
