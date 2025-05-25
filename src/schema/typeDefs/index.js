const { gql } = require("apollo-server-express");
const userTypeDefs = require("./user");

const baseTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

module.exports = [baseTypeDefs, userTypeDefs];
