const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
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

  type Query {
    candidats: [User!]!
    candidatByMail(mail: String!): User
    me: User
  }

  type Mutation {
    signup(
      nom: String!
      prenom: String!
      mail: String!
      mdp: String!
      adresse: String!
      dateNaissance: String!
    ): AuthPayload!
    login(mail: String!, mdp: String!): AuthPayload!
  }
`;

module.exports = typeDefs;
