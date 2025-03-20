# Dossier Tracking API

[![Node.js CI](https://github.com/wenceslasjb/dossier-tracker-api/actions/workflows/node.js.yml/badge.svg)](https://github.com/wenceslasjb/dossier-tracker-api/actions/workflows/node.js.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![API Version](https://img.shields.io/badge/API%20Version-1.0.0-blue)

API de suivi de dossiers avec système d'authentification JWT et gestion de workflow

## Fonctionnalités

- 🔒 Authentification JWT
- 📁 Gestion des dossiers avec workflow (en attente, en revue, approuvé, rejeté)
- 👥 Gestion des utilisateurs avec rôles (user/admin)
- 📄 Upload de documents
- 📃 Pagination et filtrage
- 📚 Documentation OpenAPI 3.0
- ✅ Tests d'intégration

## Technologies

- Backend: Node.js / Express
- Base de données: MySQL
- ORM: Sequelize
- Authentification: JWT
- Documentation: Swagger UI
- Tests: Jest/Supertest

## Démarrage rapide

### Prérequis

- Node.js 16+
- MySQL 8+
- npm 7+
- Git

### Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/wenceslasjb/dossier-tracker-api.git
cd dossier-tracker-api

2. Installer les dépendances :
npm install
3. Configurer l'environnement :

4. Configurer la base de données :
CREATE DATABASE dossier_tracker;

5. Lancer le serveur :
npm run dev

6. Configuration
Fichier .env :

# Serveur
PORT=5000
NODE_ENV=development

# Base de données
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=dossier_tracker

# JWT
JWT_SECRET=votre_secret_jwt
JWT_EXPIRES=30d

# Upload
FILE_UPLOAD_PATH=./public/uploads
MAX_FILE_UPLOAD=1000000
7. Utilisation
    Exécution
     - Mode développement :
          npm run dev
     - Mode production :
          npm start
     - Lancer les tests :
          npm test

Endpoints

Authentification

Méthode	Endpoint	Description	Authentification
POST	/auth/login	Connexion utilisateur	Non
POST	/auth/register	Création de compte	Non

Dossiers

Méthode	Endpoint	Description	Authentification
GET	/dossiers	Lister tous les dossiers	Oui (JWT)
POST	/dossiers	Créer un dossier	Oui (JWT)
GET	/dossiers/{id}	Obtenir un dossier	Oui (JWT)
PUT	/dossiers/{id}	Modifier un dossier	Oui (JWT)

Utilisateurs

Méthode	Endpoint	Description	Authentification
GET	/users	Lister les utilisateurs	Oui (Admin only)
Exemple de requête
Connexion :

    curl -X POST http://localhost:5000/api/v1/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"user@example.com","password":"password123"}'
Réponse :

{
  "success": true,
  "token": "eyJhbGciOiJIUzI...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "role": "user"
  }
}

Sécurité :
    - Validation des entrées
    - Chiffrement des mots de passe (bcrypt)
    - Protection des routes avec JWT
    - Gestion des erreurs centralisée
    - Rate limiting (100 requêtes/15min)
    - Headers de sécurité Helmet
    - Sanitization des données
Tests : 
    Lancer la suite de tests :
     npm test
    # Avec couverture de code
    npm run test:coverage
Déploiement :
    1- Configurer Nginx comme reverse proxy
    2- Utiliser PM2 pour le process management :
        npm install -g pm2
        pm2 start server.js --name dossier-api
    3- Configurer HTTPS avec Let's Encrypt

Docker :
    FROM node:16-alpine
    WORKDIR /app
    COPY package*.json ./
    RUN npm ci --only=production
    COPY . .
    EXPOSE 5000
    CMD ["node", "server.js"]

Documentation API
    Accéder à la documentation interactive :
    http://localhost:5000/api-docs



Ce README inclut :
- Badges de statut
- Instructions d'installation détaillées
- Exemples de configuration
- Documentation des endpoints
- Procédures de sécurité
- Guide de contribution
- Informations de déploiement
- Documentation API interactive

Personnalisez les sections selon vos besoins spécifiques !