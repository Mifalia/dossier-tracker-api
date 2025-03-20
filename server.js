const express = require('express');
const { sequelize } = require('./src/models');
const cors = require('cors');
require('dotenv').config();

const app = express();

const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// Ajouter après les middlewares de base
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/api/v1/auth', require('./src/routes/authRoutes'));
app.use('/api/v1/dossiers', require('./src/routes/dossierRoutes'));
app.use('/api/v1/users', require('./src/routes/userRoutes'));

// Database sync
sequelize.sync({ force: false }).then(() => {
  console.log('Database connected');
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});