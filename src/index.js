require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");
const User = require("./models/User");

async function startServer() {
  const app = express();

  // Middleware Morgan pour le logging
  app.use(morgan("dev"));

  // Connexion à MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("Connecté à MongoDB");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
    process.exit(1);
  }

  // Configuration d'Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      // Récupérer le token du header
      const authHeader = req.headers.authorization || "";
      const token = authHeader.replace("Bearer ", "");

      if (!token) return { candidat: null };

      // decoder le token
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        return { user };
      } catch (error) {
        return { user: null };
      }
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  // Démarrage du serveur
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `Serveur démarré sur http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
