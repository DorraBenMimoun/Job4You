const Candidature = require("../../models/Candidature");
const StatutCandidature = require("../../models/StatutCandidature");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");

const candidatureResolvers = {
  Query: {
    candidaturesByOffre: async (_, { offreId }, { user }) => {
      if (!user || user.role !== "recruteur") {
        throw new AuthenticationError("Accès non autorisé");
      }
      return await Candidature.find({ offre: offreId })
        .populate("candidat")
        .populate("statut");
    },

    myCandidatures: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError("Vous devez être connecté");
      }
      return await Candidature.find({ candidat: user.id })
        .populate("offre")
        .populate("statut")
        .populate("candidat");
    },
  },

  Mutation: {
    createCandidature: async (_, { input }, { user }) => {
      if (!user) {
        throw new AuthenticationError("Vous devez être connecté");
      }

      // Vérifier si l'utilisateur a déjà postulé à cette offre
      const existingCandidature = await Candidature.findOne({
        candidat: user.id,
        offre: input.offreId,
      });

      if (existingCandidature) {
        throw new UserInputError("Vous avez déjà postulé à cette offre");
      }

      // Créer la candidature
      const candidature = new Candidature({
        candidat: user.id,
        offre: input.offreId,
        lettreMotivation: input.lettreMotivation,
        cv: input.cv,
      });

      // Créer le statut initial
      const statut = new StatutCandidature({
        candidature: candidature._id,
        statut: "En attente",
      });

      await statut.save();
      candidature.statut = statut._id;
      await candidature.save();

      return await Candidature.findById(candidature._id)
        .populate("candidat")
        .populate("offre")
        .populate("statut");
    },
  },
};

module.exports = candidatureResolvers;
