const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
        type: String,
    },
    attachmentStyle: {
        type: String,
        required: true,
    },
    genderIdentity: {
        type: String,
        required: true,
    },
    genderInterests:
        {
            type: String,
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