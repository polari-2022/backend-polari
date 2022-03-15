const { AuthenticationError } = require('apollo-server-express');
const { Chat, Message, Profile, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    tech: async () => {
      return Tech.find({});
    },
    matchups: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Matchup.find(params);
    },
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
    chats: async () => {
      return Chat.find();
    },
  },
  Mutation: {
    createMatchup: async (parent, args) => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
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
    createVote: async (parent, { _id, techNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
  },
};

module.exports = resolvers;
