const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, "Le nom est requis"],
      trim: true,
    },
    prenom: {
      type: String,
      required: [true, "Le prénom est requis"],
      trim: true,
    },
    mail: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    mdp: {
      type: String,
      required: [true, "Le mot de passe est requis"],
    },
    adresse: {
      type: String,
      required: [true, "L'adresse est requise"],
      trim: true,
    },
    dateNaissance: {
      type: Date,
      required: [true, "La date de naissance est requise"],
    },
    role: {
      type: String,
      required: true,
      enum: ["candidat", "recruteur"],
      default: "candidat",
    },
  },
  {
    timestamps: true,
  }
);

// Hash du mot de passe avant la sauvegarde
userSchema.pre("save", async function (next) {
  if (!this.isModified("mdp")) return next();
  this.mdp = await bcrypt.hash(this.mdp, 10);
  next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.mdp);
};

module.exports = mongoose.model("User", userSchema);
