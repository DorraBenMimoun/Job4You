const { gql } = require("apollo-server-express");
const userTypeDefs = require("./user");
const offerTypeDefs = require("./offer");
const candidatureTypeDefs = require("./candidature");

const baseTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const typeDefs = [
  baseTypeDefs,
  userTypeDefs,
  offerTypeDefs,
  candidatureTypeDefs,
];

module.exports = typeDefs;
