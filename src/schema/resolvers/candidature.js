const Candidature = require("../../models/Candidature");
const StatutCandidature = require("../../models/StatutCandidature");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");

// Fonction  pour formater les dates
const formatDate = (date) => {
  return new Date(date).toLocaleString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const candidatureResolvers = {
  Query: {
    candidaturesByOffre: async (_, { offreId }, { user }) => {
      if (!user || user.role !== "recruteur") {
        throw new AuthenticationError("Accès non autorisé");
      }
      const candidatures = await Candidature.find({ offre: offreId })
        .populate("candidat")
        .populate("statut");

      return candidatures.map((candidature) => ({
        ...candidature.toObject(),
        createdAt: formatDate(candidature.createdAt),
        statut: {
          ...candidature.statut.toObject(),
          date: formatDate(candidature.statut.date),
        },
      }));
    },

    myCandidatures: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError("Vous devez être connecté");
      }
      const candidatures = await Candidature.find({ candidat: user.id })
        .populate("offre")
        .populate("statut")
        .populate("candidat");

      return candidatures.map((candidature) => ({
        ...candidature.toObject(),
        createdAt: formatDate(candidature.createdAt),
        statut: {
          ...candidature.statut.toObject(),
          date: formatDate(candidature.statut.date),
        },
      }));
    },

    getCandidatureById: async (_, { id }, { user }) => {
      if (!user) {
        throw new AuthenticationError("Vous devez être connecté");
      }

      const candidature = await Candidature.findById(id)
        .populate("candidat")
        .populate("offre")
        .populate("statut");

      if (!candidature) {
        throw new UserInputError("Candidature non trouvée");
      }

      // Vérifier si l'utilisateur a le droit de voir cette candidature
      if (
        user.role !== "recruteur" &&
        candidature.candidat._id.toString() !== user.id
      ) {
        throw new AuthenticationError("Accès non autorisé");
      }

      return {
        ...candidature.toObject(),
        createdAt: formatDate(candidature.createdAt),
        statut: {
          ...candidature.statut.toObject(),
          date: formatDate(candidature.statut.date),
        },
      };
    },

    getHistoriqueCandidature: async (_, { candidatureId }, { user }) => {
      if (!user) {
        throw new AuthenticationError("Vous devez être connecté");
      }

      const candidature = await Candidature.findById(candidatureId);
      if (!candidature) {
        throw new UserInputError("Candidature non trouvée");
      }

      // Vérifier si l'utilisateur a le droit de voir l'historique
      if (
        user.role !== "recruteur" &&
        candidature.candidat.toString() !== user.id
      ) {
        throw new AuthenticationError("Accès non autorisé");
      }

      const historique = await StatutCandidature.find({
        candidature: candidatureId,
      })
        .sort({ date: -1 })
        .populate("candidature");

      return historique.map((statut) => ({
        ...statut.toObject(),
        date: formatDate(statut.date),
      }));
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

      const newCandidature = await Candidature.findById(candidature._id)
        .populate("candidat")
        .populate("offre")
        .populate("statut");

      return {
        ...newCandidature.toObject(),
        createdAt: formatDate(newCandidature.createdAt),
        statut: {
          ...newCandidature.statut.toObject(),
          date: formatDate(newCandidature.statut.date),
        },
      };
    },

    updateStatutCandidature: async (_, { input }, { user }) => {
      if (!user || user.role !== "recruteur") {
        throw new AuthenticationError("Accès non autorisé");
      }

      const candidature = await Candidature.findById(
        input.candidatureId
      ).populate("statut");
      if (!candidature) {
        throw new UserInputError("Candidature non trouvée");
      }

      if (!["En attente", "Acceptée", "Rejetée"].includes(input.statut)) {
        throw new UserInputError(
          "Statut invalide. Les statuts valides sont : En attente, Acceptée, Rejetée."
        );
      }

      if (input.statut === candidature.statut.statut) {
        throw new UserInputError(
          "Veuillez choisir un statut différent de l'actuel."
        );
      }

      // Créer un nouveau statut
      const nouveauStatut = new StatutCandidature({
        candidature: candidature._id,
        statut: input.statut,
        commentaire: input.commentaire,
      });

      await nouveauStatut.save();

      // Mettre à jour la candidature avec le nouveau statut
      candidature.statut = nouveauStatut._id;
      await candidature.save();

      const updatedCandidature = await Candidature.findById(candidature._id)
        .populate("candidat")
        .populate("offre")
        .populate("statut");

      return {
        ...updatedCandidature.toObject(),
        createdAt: formatDate(updatedCandidature.createdAt),
        statut: {
          ...updatedCandidature.statut.toObject(),
          date: formatDate(updatedCandidature.statut.date),
        },
      };
    },
  },
};

module.exports = candidatureResolvers;
