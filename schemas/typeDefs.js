const { gql } = require('apollo-server-express');
// Query messages by user ID

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
    createMatchup(tech1: String!, tech2: String!): Matchup
    createVote(_id: String!, techNum: Int!): Matchup
  }
`;

module.exports = typeDefs;
