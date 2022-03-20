const { AuthenticationError } = require("apollo-server-express");
const { Message, Thread, Profile, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // get all users
    users: async () => {
      return User.find().populate("profile");
    },
    // need to get one user by id for signup and so can add user id to profile schema
    user: async (parent, args) => {
      return await User.findById(args.id).populate("profile");
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
        .populate("match");
    },
    // get all the threads for one user by the user's id
    threads: async (parent, args) => {
      return Thread.find(args)
        .populate("messages")
        .populate("user")
        .populate("match");
    },
    // get one thread by id (also might need to query for user's id that is logged in)
    thread: async (parent, args) => {
      return Thread.findById(args.id)
        .populate("messages")
        .populate("user")
        .populate("match");
    },
    // get all messages
    messagesTest: async () => {
      return Message.find({}).populate("thread").populate("user");
    },
    // get messages by id of the thread
    messages: async (parent, args) => {
      return Message.find(args).populate("thread").populate("user");
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("profile");
      }
      throw newAuthenticationError("You need to be logged in!");
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
    // update a user to add the profile ID
    updateUser: async (parent, args, context)=>{
      if(context.user){
        return await User.findOneAndUpdate(
          {_id:args.id},
          {$set:{profile:args.profile}},
          {new:true}
        ).populate("profile");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // create a new profile
    addProfile: async (
      parent,
      {
        firstName,
        photo,
        attachmentStyle,
        genderIdentity,
        genderInterests,
        bio,
        birthdate,
        pronouns,
        sexualOrientation,
        currentCity,
        user,
      },
      context
    ) => {
      // if (currentCity) {
      //   currentCity.toLowerCase();
      // }
      if (context.user) {
        const profile = await Profile.create(
          {
            firstName,
            photo,
            attachmentStyle,
            genderIdentity,
            genderInterests,
            bio,
            birthdate,
            pronouns,
            sexualOrientation,
            currentCity,
            user,
          }
          // {_id: context.user._id},
          // {$addToSet: {Profile: profileData}},
          // {new: true},
        ).populate("user");
        return profile;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // updateProfile: async
    updateProfile: async (parent, args, context) => {
      console.log(context)
      // if (currentCity) {
      //   currentCity.lowercase();
      // }
      if (context.user) {
        return await Profile.findOneAndUpdate(
          { _id: args.id },
          {
            $set: {
              firstName: args.firstName,
              photo: args.photo,
              attachmentStyle: args.attachmentStyle,
              genderIdentity: args.genderIdentity,
              genderInterests: args.genderInterests,
              bio: args.bio,
              birthdate: args.birthdate,
              pronouns: args.pronouns,
              sexualOrientation: args.sexualOrientation,
              currentCity: args.currentCity,
            },
          },
          { new: true }
        ).populate("user");
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // add a thread
    addThread: async (
      parent,
      { text, date, user, match, messages },
      context
    ) => {
      if (context.user) {
        const thread = await Thread.create({
          text,
          date,
          user,
          match,
          messages,
        })
        // .populate("user").populate("match").populate("messages");
        return thread;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // delete a thread by the id
    removeThread: async (parent, { threadId }, context) => {
      if (context.user) {
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

    // add a message
    addMessage: async (
      parent,
      {text, date, thread, user },
      context
    ) => {
      if (context.user) {
        const message = await Message.create({
          text,
          date,
          thread,
          user,
        });
        return message;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // delete a message by id look at activity 12 resolvers
    removeMessage: async (parent, { messageId }, context) => {
      if (context.user) {
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
