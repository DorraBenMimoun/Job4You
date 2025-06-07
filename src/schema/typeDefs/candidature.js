const { gql } = require("apollo-server-express");

const candidatureTypeDefs = gql`
  type Candidature {
    id: ID!
    candidat: User!
    offre: Offer!
    lettreMotivation: String
    cv: String
    statut: StatutCandidature!
    createdAt: String!
  }

  type StatutCandidature {
    id: ID!
    candidature: Candidature!
    statut: String!
    commentaire: String
    date: String!
  }

  input CandidatureInput {
    offreId: ID!
    lettreMotivation: String
    cv: String
  }

  extend type Query {
    candidaturesByOffre(offreId: ID!): [Candidature!]!
    myCandidatures: [Candidature!]!
  }

  extend type Mutation {
    createCandidature(input: CandidatureInput!): Candidature!
  }
`;

module.exports = candidatureTypeDefs;
