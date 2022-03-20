const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
        type: String,
        // required: true,
    },
    attachmentStyle: {
        type: String,
        // enum: ['secure', 'avoidant', 'anxious'],
        required: true,
    },
    genderIdentity: {
        type: String,
        // enum: ['woman', 'man', 'non-binary'],
        required: true,
    },
    genderInterests:
        {
            type: String,
            // enum: ['women', 'men', 'non-binary'],
            required: true,
        },
    bio: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: true,
    },
    pronouns: {
        type: String,
        maxLength: 15,
    },
    sexualOrientation: {
        type: String,
        maxLength: 30,
    },
    currentCity: {
        type: String,
        required: true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

const Profile = model('Profile', profileSchema);

module.exports = Profile;






// const { Schema, model } = require('mongoose');

// const profileSchema = new Schema({
//     firstName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     photo: {
//         type: String,
//         required: true,
//     },
//     attachmentStyle: {
//         type: String,
//         enum: ['secure', 'avoidant', 'anxious'],
//         required: true,
//     },
//     genderIdentity: {
//         type: String,
//         enum: ['women', 'men', 'non-binary'],
//         required: true,
//     },
//     genderInterests: {
//         type: [String],
//         enum: ['women', 'men', 'non-binary'],
//         required: true,
//     },
//     bio: {
//         type: String,
//         required: true,
//     },
//     birthdate: {
//         type: Date,
//         required: true,
//     },
//     pronouns: {
//         type: String,
//         maxLength: 15,
//     },
//     sexualOrientation: {
//         type: String,
//         maxLength: 30,
//     },
//     currentLocation: {
//         type: Number,
//         maxLength: 5,
//         required: true,
//     },
// })

// const Profile = model('Profile', profileSchema);

// module.exports = Profile;