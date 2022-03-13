const { gql } = require('apollo-server-express');
// Query messages by user ID
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
    photo:Photo!
    attachmentStyle:String!
    genderIdentity:String!
    genderInterests:String!
    bio:string!
    birthdate:Date!
    pronouns:String
    sexualOrientation:String
    user: User
  }
  input InputProfile{
    profileId: string!
    firstName: String!
    photo:Photo!
    attachmentStyle:String!
    genderIdentity:String!
    genderInterests:String!
    bio:string!
    birthdate:Date!
    pronouns:String
    sexualOrientation:String
    user: User
  }

  type: Message {
    _id: ID!
    text: String!
    date: Date!
    user: User
    match: User
  }

  type: Chat {
    _id: ID!
    text: String!
    date: Date!
    message: Message
    user: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: [User]
    profile: [Profile]
    message: [Message]
    chat: [Chat]
    profile(_id: String): [Profile]
    messages(_id: String): [Message]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email:String!, password:String!):Auth
    addProfile(input:InputProfile!):Profile
    updateProfile(profileId:ID!):Profile
    removeMessage(messageId:ID!):Message
    removeChat(chatId:ID!):Chat
  }
`;

module.exports = typeDefs;
