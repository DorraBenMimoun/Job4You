const jwt = require("jsonwebtoken");
const User = require("../models/User");

const resolvers = {
  Query: {
    candidats: async () => {
      return await User.find({ role: "candidat" });
    },
    candidatByMail: async (_, { mail }) => {
      return await User.findOne({ mail });
    },
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Non authentifié");
      return await User.findById(user.id);
    },
  },
  Mutation: {
    signup: async (_, { nom, prenom, mail, mdp, adresse, dateNaissance }) => {
      const existingUser = await User.findOne({ mail });
      if (existingUser) {
        throw new Error("Un utilisateur avec cet email existe déjà");
      }

      const user = new User({
        nom,
        prenom,
        mail,
        mdp,
        adresse,
        dateNaissance,
      });

      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      return {
        token,
        user,
      };
    },
    login: async (_, { mail, mdp }) => {
      const user = await User.findOne({ mail });
      if (!user) {
        throw new Error("Aucun utilisateur trouvé avec cet email");
      }

      const valid = await user.comparePassword(mdp);
      if (!valid) {
        throw new Error("Mot de passe incorrect");
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      return {
        token,
        user,
      };
    },
  },
};

module.exports = resolvers;
