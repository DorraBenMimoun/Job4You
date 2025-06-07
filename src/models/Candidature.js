const mongoose = require("mongoose");

const candidatureSchema = new mongoose.Schema({
  candidat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  offre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offer",
    required: true,
  },
  lettreMotivation: {
    type: String,
    trim: true,
  },
  cv: {
    type: String,
    trim: true,
  },
  statut: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StatutCandidature",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Candidature", candidatureSchema);
