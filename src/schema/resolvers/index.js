const userResolvers = require("./user");
const offerResolvers = require("./offer");

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...offerResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...offerResolvers.Mutation,
  },
};

module.exports = resolvers;
