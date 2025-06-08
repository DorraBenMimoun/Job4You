# Job4You - Système de Suivi des Candidatures

Une API GraphQL pour la gestion des offres d'emploi, des candidatures, et du suivi des statuts. Conçue pour les recruteurs et candidats dans une entreprise tech.

## 🧰 Technologies utilisées

- **Node.js** / **Express**
- **Apollo Server (GraphQL)**
- **MongoDB** avec **Mongoose**
- **JWT** pour l'authentification
- **bcryptjs** pour le hachage des mots de passe

## ✅ Prérequis

Avant de démarrer, vous devez avoir installé :

- [Node.js](https://nodejs.org/) v16 ou supérieur
- [npm](https://www.npmjs.com/)
- Un compte MongoDB Atlas ou une instance locale


## 🚀 Lancement du projet
# Installer les dépendances
```
npm install
```
# Démarrer le serveur
```
npm start
```
Le serveur tourne sur http://localhost:4000/graphql par défaut.

## 📌 Structure du projet
```

job4you/
│
├── models/               # Modèles Mongoose (User, Offer, Candidature, StatutCandidature)
├── schema.graphql        # Définition complète du schéma GraphQL (types, inputs, queries, mutations)
├── resolvers/            # Résolveurs GraphQL : logique des queries et mutations
├── typeDefs/             # Déclarations de types GraphQL (si séparées du schéma principal)
├── server.js             # Point d’entrée principal de l'application (configuration Apollo Server + MongoDB)
├── .env                  # Variables d’environnement (URI MongoDB, secret JWT, etc.)
└── README.md             # Documentation du projet (présentation, installation, exemples d'utilisation)

```

---
## 📁 Schéma GraphQL
Le schéma complet est disponible dans le fichier schema.graphql. Il contient :

Types : User, Offer, Candidature, StatutCandidature

Inputs : OfferInput, CandidatureInput, UpdateStatutInput

Queries : offers, myCandidatures, getCandidatureById, etc.

Mutations : createOffer, createCandidature, updateStatutCandidature, signup, login

## 🧪 Tests & Améliorations possibles
🔐 Middleware d’authentification

📊 Statistiques de candidatures

📬 Notifications e-mail (nodemailer)

📁 Upload de fichiers (cv)

