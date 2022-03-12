const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
        type: Photo,
        required: true,
    },
    attachmentStyle: {
        type: String,
        // Look up data type for the three attachment styles
        require: true,
    },
    genderIdentity: {
        type: String,
        // Look up data type for the three attachment styles
        require: true,
    },
    genderInterests: {
        type: String,
        // Look up data type for array
        require: true,
    },
    bio: {
        type: String,
        // Double check
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