const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  localisation: {
    type: String,
    required: true,
    trim: true,
  },
  salaire: {
    type: String,
    required: true,
  },
  requirements: [
    {
      type: String,
      required: true,
    },
  ],
  recruteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateExpiration: {
    type: Date,
    required: false,
  },
  typeContrat: {
    type: String,
    required: true,
    enum: ["CDI", "CDD", "Stage", "Alternance"],
  },
  teletravail: {
    type: Boolean,
    default: false,
  },
  etat: {
    type: String,
    required: true,
    enum: ["Ouverte", "Fermée"],
    default: "Ouverte",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Offer", offerSchema);
