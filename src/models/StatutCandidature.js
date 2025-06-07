const mongoose = require("mongoose");

const statutCandidatureSchema = new mongoose.Schema({
  candidature: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidature",
    required: true,
  },
  statut: {
    type: String,
    required: true,
    enum: ["En attente", "Acceptée", "Rejetée"],
    default: "En attente",
  },
  commentaire: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StatutCandidature", statutCandidatureSchema);
