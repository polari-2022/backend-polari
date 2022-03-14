const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
        type: String,
        required: true,
    },
    attachmentStyle: {
        type: String,
        enum: ['secure', 'avoidant', 'anxious'],
        require: true,
    },
    genderIdentity: {
        type: String,
        enum: ['women', 'men', 'non-binary'],
        require: true,
    },
    genderInterests: {
        type: [String],
        enum: ['women', 'men', 'non-binary'],
        require: true,
    },
    bio: {
        type: String,
        require: true,
    },
    birthdate: {
        type: Date,
        require: true,
    },
    pronouns: {
        type: String,
        maxLength: 15,
    },
    sexualOrientation: {
        type: String,
        maxLength: 30,
    },
})

const Profile = model('Profile', profileSchema);

module.exports = Profile;