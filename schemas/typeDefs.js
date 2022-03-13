const { gql } = require('apollo-server-express');

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



  

  type Query {
    tech: [Tech]
    matchups(_id: String): [Matchup]
  }

  type Mutation {
    createMatchup(tech1: String!, tech2: String!): Matchup
    createVote(_id: String!, techNum: Int!): Matchup
  }
`;

module.exports = typeDefs;
