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
    messages: async () => {
      return Message.find();
    },
    threads: async () => {
      return Thread.find();
    },
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
