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

Créer un fichier `.env` avec le contenu suivant :

```env
MONGODB_URI="mongodb+srv://admin:admin@job4you.wms6tcq.mongodb.net/?retryWrites=true&w=majority&appName=Job4You"
JWT_SECRET="job4you_token_secret"
🚀 Lancement du projet
bash
Copier
Modifier
# Cloner le repo
git clone https://github.com/votre-utilisateur/job4you-api.git

# Se placer dans le dossier
cd job4you-api

# Installer les dépendances
npm install

# Démarrer le serveur
npm start
Le serveur tourne sur http://localhost:4000/graphql par défaut.

📌 Structure du projet
bash
Copier
Modifier
job4you-api/
│
├── models/               # Modèles Mongoose (User, Offer, Candidature, etc.)
├── resolvers/            # Fonctions GraphQL (Mutation, Query)
├── schema.graphql        # Définition du schéma GraphQL
├── utils/                # Fonctions utilitaires (auth, validation, etc.)
├── server.js             # Point d’entrée de l’application
├── .env                  # Variables d’environnement
└── README.md
📡 API GraphQL – Exemple de requêtes
🔐 Authentification
Signup
graphql
Copier
Modifier
mutation {
  signup(
    nom: "Doe",
    prenom: "John",
    mail: "john@example.com",
    mdp: "123456",
    adresse: "Paris",
    dateNaissance: "1995-08-10"
  ) {
    token
    user {
      id
      nom
    }
  }
}
Login
graphql
Copier
Modifier
mutation {
  login(mail: "john@example.com", mdp: "123456") {
    token
    user {
      id
      mail
    }
  }
}
📄 Offres
Créer une offre
graphql
Copier
Modifier
mutation {
  createOffer(input: {
    titre: "Développeur Fullstack",
    description: "Node.js / Angular",
    localisation: "Tunis",
    salaire: "4000 TND",
    requirements: ["Node.js", "MongoDB"],
    typeContrat: "CDI",
    teletravail: true
  }) {
    id
    titre
  }
}
Voir toutes les offres
graphql
Copier
Modifier
query {
  offers {
    id
    titre
    salaire
    typeContrat
  }
}
🎯 Candidatures
Soumettre une candidature
graphql
Copier
Modifier
mutation {
  createCandidature(input: {
    offreId: "ID_OFFRE",
    lettreMotivation: "Je suis motivé...",
    cv: "cv_john_doe.pdf"
  }) {
    id
    statut {
      statut
    }
  }
}
Suivre l’historique de statut
graphql
Copier
Modifier
query {
  getHistoriqueCandidature(candidatureId: "ID_CANDIDATURE") {
    statut
    commentaire
    date
  }
}
📁 Schéma GraphQL
Le schéma complet est disponible dans le fichier schema.graphql. Il contient :

Types : User, Offer, Candidature, StatutCandidature

Inputs : OfferInput, CandidatureInput, UpdateStatutInput

Queries : offers, myCandidatures, getCandidatureById, etc.

Mutations : createOffer, createCandidature, updateStatutCandidature, signup, login

🧪 Tests & Améliorations possibles
🔐 Middleware d’authentification

📊 Statistiques de candidatures

📬 Notifications e-mail (nodemailer)

📁 Upload de fichiers (cv)

