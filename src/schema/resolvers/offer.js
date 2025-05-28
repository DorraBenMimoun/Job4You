const Offer = require("../../models/Offer");
const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");

const offerResolvers = {
  Query: {
    offers: async () => {
      return await Offer.find().populate("recruteur");
    },
    offer: async (_, { id }) => {
      return await Offer.findById(id).populate("recruteur");
    },
  },
  Mutation: {
    createOffer: async (_, { input }, { user }) => {
      if (!user) {
        throw new AuthenticationError("Vous devez être connecté");
      }
      if (user.role !== "recruteur") {
        throw new ForbiddenError(
          "Seuls les recruteurs peuvent créer des offres"
        );
      }

      const offer = new Offer({
        ...input,
        recruteur: user.id,
      });

      return await offer.save();
    },
    deleteOffer: async (_, { id }, { user }) => {
      if (!user) {
        throw new AuthenticationError("Vous devez être connecté");
      }

      const offer = await Offer.findById(id);
      if (!offer) {
        throw new Error("Offre non trouvée");
      }

      if (offer.recruteur.toString() !== user.id) {
        throw new ForbiddenError(
          "Vous ne pouvez supprimer que vos propres offres"
        );
      }

      await Offer.findByIdAndDelete(id);
      return true;
    },
  },
};

module.exports = offerResolvers;
