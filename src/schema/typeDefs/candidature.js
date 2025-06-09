const { gql } = require("apollo-server-express");

const candidatureTypeDefs = gql`
  type Candidature {
    _id: ID!
    candidat: User!
    offre: Offer!
    lettreMotivation: String
    cv: String
    statut: StatutCandidature!
    createdAt: String!
  }

  type StatutCandidature {
    _id: ID!
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

  input UpdateStatutInput {
    candidatureId: ID!
    statut: String!
    commentaire: String
  }

  extend type Query {
    candidaturesByOffre(offreId: ID!): [Candidature!]!
    myCandidatures: [Candidature!]!
    getCandidatureById(id: ID!): Candidature
    getHistoriqueCandidature(candidatureId: ID!): [StatutCandidature!]!
  }

  extend type Mutation {
    createCandidature(input: CandidatureInput!): Candidature!
    updateStatutCandidature(input: UpdateStatutInput!): Candidature!
  }
`;

module.exports = candidatureTypeDefs;
