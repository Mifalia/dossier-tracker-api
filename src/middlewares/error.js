const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log pour le développement
  console.log(err.stack.red);

  // Erreur Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Ressource non trouvée avec l'id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Erreur de validation Mongoose
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Erreur serveur'
  });
};

module.exports = errorHandler;
