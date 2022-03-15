const { gql } = require('apollo-server-express');
// Query threads by user ID
// check inputProfile if it work!!!

const typeDefs = gql`
  type User {
    _id: ID!
    email:String!
    password:String!
  }

  type Profile {
    _id: ID!
    firstName: String!
    photo:String!
    attachmentStyle:String!
    genderIdentity:String!
    genderInterests:[String]!
    bio:string!
    birthdate:Date!
    pronouns:String
    sexualOrientation:String
    user: User
  }
  input InputProfile{
    profileId: string!
    firstName: String!
    photo:String!
    attachmentStyle:String!
    genderIdentity:String!
    genderInterests:[String]!
    bio:string!
    birthdate:Date!
    pronouns:String
    sexualOrientation:String
    user: User
  }

  type: Thread {
    _id: ID!
    text: String!
    date: Date!
    user: User
    match: User
  }

  type: Message {
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
    profiles: [Profile]
    threads: [Thread]
    messages: [Message]
    profile(_id: String): [Profile]
    thread(_id: String): [Thread]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email:String!, password:String!): Auth
    addProfile(input:InputProfile!): Profile
    updateProfile(profileId:ID!): Profile
    removeThread(threadId:ID!): Thread
    removeMessage(messageId:ID!): Message
  }
`;

module.exports = typeDefs;
