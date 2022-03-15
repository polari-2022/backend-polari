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
    // Needs to be by gender interests and attachment style
    // Math.random
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
  },
};

module.exports = resolvers;
