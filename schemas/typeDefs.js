const { gql } = require("apollo-server-express");
// Query threads by user ID
// check inputProfile if it work!!!

const typeDefs = gql`
  scalar Date
  type User {
    _id: ID!
    email: String!
    password: String!
    profile: Profile
  }

  type Profile {
    _id: ID!
    firstName: String!
    photo: String
    attachmentStyle: String!
    genderIdentity: String!
    genderInterests: [String]!
    bio: String!
    birthdate: Date!
    pronouns: String
    sexualOrientation: String
    userId: String
    user: User
    currentCity: String!
  }
  input ProfileInput {
    profileId: String!
    firstName: String
    photo: String
    attachmentStyle: String
    genderIdentity: String
    genderInterests: [String]
    bio: String
    birthdate: Date
    pronouns: String
    sexualOrientation: String
    currentCity: String
  }

  type Thread {
    _id: ID!
    text: String!
    date: Date!
    user: User
    match: User
    messages: [Message]
    userId: String
  }

  type Message {
    _id: ID!
    text: String!
    date: Date!
    thread: Thread
    user: User
    threadId: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    profiles: [Profile]
    profile(id: ID!): Profile
    threadsTest: [Thread]
    threads(userId: String!): [Thread]
    messagesTest: [Message]
    thread(id: ID!): Thread
    messages(threadId: String!): [Message]
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, password: String!): Auth
    addProfile(
      firstName: String
      photo: String
      attachmentStyle: String
      genderIdentity: String
      genderInterests: [String]
      bio: String
      birthdate: Date
      pronouns: String
      sexualOrientation: String
      currentCity: String
      userId: String
    ): Profile
    updateProfile(
      id: ID!
      firstName: String
      photo: String
      attachmentStyle: String
      genderIdentity: String
      genderInterests: [String]
      bio: String
      birthdate: Date
      pronouns: String
      sexualOrientation: String
      currentCity: String
    ): Profile
    addThread(
      text: String
      date: Date!
      user: User
      match: User
      messages: [Message]
      userId: String): Thread
    removeThread(threadId: ID!): Thread
    addMessage(
      text: String
      date: Date
      thread: Thread
      user: User
      threadId): String: Message
    removeMessage(messageId: ID!): Message
  }
`;

module.exports = typeDefs;
