const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Désactive les logs SQL
    define: {
      timestamps: true // Active created_at et updated_at automatiquement
    }
  }
);

// Test de connexion
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Connection error:', err));

  /*sequelize.sync({ force: true }) // Uniquement en développement !
  .then(() => console.log('Tables créées avec succès'))
  .catch(err => console.error('Erreur de création:', err));*/
  
module.exports = sequelize;