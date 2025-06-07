const userResolvers = require("./user");
const offerResolvers = require("./offer");
const candidatureResolvers = require("./candidature");

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...offerResolvers.Query,
    ...candidatureResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...offerResolvers.Mutation,
    ...candidatureResolvers.Mutation,
  },
};

module.exports = resolvers;
