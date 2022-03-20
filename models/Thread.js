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
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    match:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    messages:[
        {
            type:Schema.Types.ObjectId,
            ref:'Message'
        }
    ],
})

const Thread = model('Thread', threadSchema);

module.exports = Thread;




// const { Schema, model } = require('mongoose');

// const threadSchema = new Schema({
//     text:{
//        type: String,
//        required:true, 
//     },
//     date:{
//         type:Date,
//         required:true,
//         default:Date.now,
//     },
// })

// const Thread = model('Thread', threadSchema);

// module.exports = Thread;
