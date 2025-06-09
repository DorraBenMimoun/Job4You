const { gql } = require("apollo-server-express");

const userTypeDefs = gql`
  type User {
    _id: ID!
    mail: String!
    nom: String!
    prenom: String!
    mdp: String!
    adresse: String!
    dateNaissance: String!
    role: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Query {
    candidats: [User!]!
    candidatByMail(mail: String!): User
    me: User
    listUsers: [User!]!
  }

  extend type Mutation {
    signup(
      nom: String!
      prenom: String!
      mail: String!
      mdp: String!
      adresse: String!
      dateNaissance: String!
    ): AuthPayload!
    login(mail: String!, mdp: String!): AuthPayload!
    changeRole(id: ID!, role: String!): User!
  }
`;

module.exports = userTypeDefs;
