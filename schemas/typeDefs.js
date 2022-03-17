const { gql } = require('apollo-server-express');
// Query threads by user ID
// check inputProfile if it work!!!

const typeDefs = gql`
  scalar Date 
  type User {
    _id: ID!
    email:String!
    password:String!
    profile: Profile
  }

  type Profile {
    _id: ID!
    firstName: String!
    photo:String!
    attachmentStyle:String!
    genderIdentity:String!
    genderInterests:[String]!
    bio: String!
    birthdate:Date!
    pronouns:String
    sexualOrientation:String
    user: User
    currentLocation: Int!
  }
  input ProfileInput{
    profileId: String!
    firstName: String
    photo: String
    attachmentStyle: String
    genderIdentity: String
    genderInterests:[String]
    bio: String
    birthdate: Date
    pronouns: String
    sexualOrientation: String
    currentLocation: Int
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
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user( id: ID!): User
    profiles: [Profile]
    profile( id: ID!): Profile
    threadsTest: [Thread]
    threads(userId: String!): [Thread]
    messagesTest: [Message]
    thread( id: ID!): Thread
    messages(threadId:ID!): [Message]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email:String!, password:String!): Auth
    addProfile(firstName: String, photo: String, attachmentStyle: String, genderIdentity: String, genderInterests: [String], bio: String, birthdate: Date, pronouns: String, sexualOrientation: String, currentLocation: Int): Profile
    updateProfile(id: ID!, firstName: String, photo: String, attachmentStyle: String, genderIdentity: String, genderInterests: [String], bio: String, birthdate: Date, pronouns: String, sexualOrientation: String, currentLocation: Int): Profile
    removeThread(threadId:ID!,userId:ID!): Thread
    removeMessage(messageId:ID!,userId:ID!): Message
  }
`;

module.exports = typeDefs;
