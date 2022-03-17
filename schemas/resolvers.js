const { AuthenticationError } = require("apollo-server-express");
const { Message, Thread, Profile, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // get all users
    users: async () => {
      return User.find();
    },
    // need to get one user by id for signup and so can add user id to profile schema
    user: async (parent, args) => {
      return await User.findById(args.id);
    },
    // get all profiles
    profiles: async () => {
      return Profile.find({}).populate("user");
    },
    // get one profile by id -this is to for the dashboard
    profile: async (parent, args) => {
      return Profile.findById(args.id).populate("user");
    },
    // get all threads
    threadsTest: async () => {
      return Thread.find({})
        .populate("messages")
        .populate("user")
        .populate("match")
    },
    // get all the threads for one user by the user's id
    threads: async (parent, args) => {
      return Thread.find(args)
        .populate("messages")
        .populate("user")
        .populate("match")
    },
    // get one thread by id (also might need to query for user's id that is logged in)
    thread: async (parent, args) => {
      return Thread.findById(args.id)
        .populate("messages")
        .populate("user")
        .populate("match")
    },
    // get all messages
    messagesTest: async () => {
      return Message.find({})
      .populate("thread")
      .populate("user")
    },
    // get messages by id of the thread
    messages: async (parent, { threadId }) => {
      return Message.find({ _id: threadId })
      .populate("thread")
      .populate("user")
    },
  },
  Mutation: {
    // update - login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError(
          "Incorrect email or password! Try again QUEEN"
        );
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError(
          "Incorrect email or password! Try again QUEEN"
        );
      }

      const token = signToken(user);
      return { token, user };
    },
    // create a new user
    addUser: async (parent, { email, password }) => {
      const user = await User.create({ email, password });
      const token = signToken(user);

      return { token, user };
    },
    // create a new profile
    addProfile: async (parent, { id, firstName, photo, attachmentStyle, genderIdentity, genderInterests, bio, birthdate, pronouns, sexualOrientation, currentLocation, userId }, context) => {
      if (userId) {
        const profile = await Profile.create(
          { id, firstName, photo, attachmentStyle, genderIdentity, genderInterests, bio, birthdate, pronouns, sexualOrientation, currentLocation }
          // {_id: context.user._id},
          // {$addToSet: {Profile: profileData}},
          // {new: true},
        );
        return profile;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // updateProfile: async
    updateProfile: async (parent, { id, firstName, photo, attachmentStyle, genderIdentity, genderInterests, bio, birthdate, pronouns, sexualOrientation, currentLocation }) => {
      return await Profile.findOneAndUpdate(
        { _id: id },
        // add something here
        { firstName, photo, attachmentStyle, genderIdentity, genderInterests, bio, birthdate, pronouns, sexualOrientation, currentLocation },
        { new: true }
      );
    },
    // delete a thread by the id
    removeThread: async (parent, { threadId, userId }, context) => {
      if (userId) {
        const deleteThread = await Thread.findOneAndDelete(
          { _id: threadId }
          // {$pull:{threadId}},
          // {new:true}
        );
        await Message.findByIdAndDelete({ threadId });
        // delete the messages too !
        return deleteThread;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // delete a message by id look at activity 12 resolvers
    removeMessage: async (parent, { messageId, userId }, context) => {
      if (userId) {
        return Message.findOneAndDelete(
          { _id: messageId }
          // { _id: context.user._id },
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;




// const { AuthenticationError } = require('apollo-server-express');
// const { Message, Thread, Profile, User } = require('../models');
// const { signToken } = require('../utils/auth');

// const resolvers = {
//   Query: {
//     profiles: async () => {
//       return Profile.find();
//     },
//     profile: async (parent, { profileId }) => {
//       return Profile.findOne({ _id: profileId });
//     },
//     users: async () => {
//       return User.find();
//     },
//     threadsTest: async () => {
//       return Thread.find();
//     },
//     threads: async (parent, { userId }) => {
//       return Thread.find({ _id: userId });
//     },
//     thread: async (parent, { threadId }) => {
//       return Thread.findOne({ _id: threadId });
//     },
//     messagesTest: async () => {
//       return Message.find();
//     },
//     messages: async (parent, { threadId }) => {
//       return Message.find({ _id: threadId });
//     },
//     // Query all the profiles except for the logged in user.
//     // Have the algorithm for matches
//     // Needs to be by gender interests and attachment style and locations 25miles
//     // error handleing -if person is too far a way have something written
//     // Math.random
//     //
//   },
//   Mutation: {
//     login: async (parent, { email, password }) => {
//       const user = await User.findOne({ email });

//       if (!user) {
//         throw new AuthenticationError('Incorrect email or password! Try again QUEEN');
//       }

//       const correctPw = await user.isCorrectPassword(password);

//       if (!correctPw) {
//         throw new AuthenticationError('Incorrect email or password! Try again QUEEN');
//       }

//       const token = signToken(user);
//       return { token, user };
//     },
//     addUser:async (parent, { email, password }) => {
//       const user = await User.create({ email, password });
//       const token = signToken(user);

//       return { token, user };
//     },
//     addProfile: async (parent, {profileData}, context)=>{
//       if(context.user){
//         const profile = await Profile.create({profileData},
//           {_id: context.user._id},
//           // {$addToSet: {Profile: profileData}},
//           {new: true},
//         );
//         return profile;
//       }
//       throw new AuthenticationError('You need to be logged in!');
//     },
//     // updateProfile: async
//     removeThread:async (parent, {threadId}, context) => {
//       if (context.user) {
//         const deleteThread = await Thread.findOneAndUpdate(
//           { _id: context.user._id },
//           {$pull:{threadId}},
//           {new:true}
//         );
//         // delete the messages too !
//       }
//       throw new AuthenticationError('You need to be logged in!');
//     },
//     // removeMessage
//     removeMessage:async (parent, {threadId}, context) => {
//       if (context.user) {
//         const deleteThread = await Thread.findOneAndUpdate(
//           { _id: context.user._id },
//           {$pull:{threadId}},
//           {new:true}
//         );
//         // delete the messages too !
//       }
//       throw new AuthenticationError('You need to be logged in!');
//     },
//   },
// };

// module.exports = resolvers;
