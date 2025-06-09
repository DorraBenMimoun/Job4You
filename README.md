# Job4You - WebService GraphQL de Gestion des Candidatures

## Description

Job4You est un webservice GraphQL conçu pour la gestion des candidatures et des offres d'emploi. Ce service web permet aux recruteurs de publier des offres d'emploi et aux candidats de postuler à ces offres de manière efficace et sécurisée.

## Fonctionnalités Principales

- �� Authentification sécurisée avec JWT
- 👥 Gestion des utilisateurs (candidats et recruteurs)
- 📝 Publication et gestion des offres d'emploi
- 📊 Suivi des candidatures
- 🔍 Recherche avancée d'offres
- 📱 API GraphQL moderne et flexible

## Technologies Utilisées

- Node.js
- Express
- Apollo Server
- GraphQL
- MongoDB avec Mongoose
- JWT pour l'authentification
- Bcrypt pour le hachage des mots de passe

## Prérequis

- Node.js (v14 ou supérieur)
- MongoDB
- npm ou yarn

## Installation

1. Cloner le repository :

```bash
git clone [URL_DU_REPO]
cd Job4You
```

2. Installer les dépendances :

```bash
npm install
```

3. Configurer les variables d'environnement :
   Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
MONGODB_URI=uri_mongodb
JWT_SECRET=secret_jwt
PORT=4000
```

4. Démarrer le serveur :

```bash
# Mode développement
npm run dev

# Mode production
npm start
```

## Structure du Projet

```
src/
├── models/           # Modèles Mongoose
│   ├── User.js      # Modèle utilisateur
│   ├── Offer.js     # Modèle offre d'emploi
│   ├── Candidature.js
│   └── StatutCandidature.js
├── schema/          # Définitions GraphQL
│   ├── typeDefs/    # Types GraphQL
│   └── resolvers/   # Résolveurs GraphQL
└── index.js         # Point d'entrée de l'application
```

## API GraphQL

L'API est accessible à l'adresse : `http://localhost:4000/graphql`

### Principales Opérations

- Authentification des utilisateurs
- Gestion des profils (candidats/recruteurs)
- CRUD des offres d'emploi
- Gestion des candidatures
- Recherche et filtrage des offres

## Sécurité

- Authentification JWT
- Hachage des mots de passe avec Bcrypt
- Validation des données
- Protection des routes sensibles

## Licence

Ce projet est sous licence MIT.
