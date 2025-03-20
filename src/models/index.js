const sequelize = require('../config/database');

const User = require('./User');
const Dossier = require('./Dossier');

// Associations
Dossier.belongsTo(User, { as: 'Creator', foreignKey: 'createdBy' });
Dossier.belongsTo(User, { as: 'Assignee', foreignKey: 'assignedTo' });

module.exports = {
  sequelize,
  User,
  Dossier
};