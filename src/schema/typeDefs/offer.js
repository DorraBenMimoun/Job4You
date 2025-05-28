const { gql } = require("apollo-server-express");

const offerTypeDefs = gql`
  type Offer {
    id: ID!
    titre: String!
    description: String!
    localisation: String!
    salaire: String!
    requirements: [String!]!
    recruteur: User!
    createdAt: String!
  }

  input OfferInput {
    titre: String!
    description: String!
    localisation: String!
    salaire: String!
    requirements: [String!]!
  }

  extend type Query {
    offers: [Offer!]!
    offer(id: ID!): Offer
  }

  extend type Mutation {
    createOffer(input: OfferInput!): Offer!
    deleteOffer(id: ID!): Boolean!
  }
`;

module.exports = offerTypeDefs;
