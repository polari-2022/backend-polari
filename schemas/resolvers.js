const { AuthenticationError } = require('apollo-server-express');
const { Message, Thread, Profile, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },
    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    users: async () => {
      return User.find();
    },
    threadsTest: async () => {
      return Thread.find();
    },
    threads: async (parent, { userId }) => {
      return Thread.find({ _id: userId });
    },
    thread: async (parent, { threadId }) => {
      return Thread.findOne({ _id: threadId });
    },
    messagesTest: async () => {
      return Message.find();
    },
    messages: async (parent, { threadId }) => {
      return Message.find({ _id: threadId });
    },
    // Query all the profiles except for the logged in user.  
    // Have the algorithm for matches
    // Needs to be by gender interests and attachment style and locations 25miles 
    // error handleing -if person is too far a way have something written 
    // Math.random
    // 
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect email or password! Try again QUEEN');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect email or password! Try again QUEEN');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser:async (parent, { email, password }) => {
      const user = await User.create({ email, password });
      const token = signToken(user);

      return { token, user };
    },
    addProfile: async (parent, {profileData}, context)=>{
      if(context.user){
        const profile = await Profile.create({profileData},
          {_id: context.user._id},
          // {$addToSet: {Profile: profileData}},
          {new: true},
        );
        return profile;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // updateProfile: async
    removeThread:async (parent, {threadId}, context) => {
      if (context.user) {
        const deleteThread = await Thread.findOneAndUpdate(
          { _id: context.user._id },
          {$pull:{threadId}},
          {new:true}
        );
        // delete the messages too ! 
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // removeMessage
  },
};

module.exports = resolvers;
