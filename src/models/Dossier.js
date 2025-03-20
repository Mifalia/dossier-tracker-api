const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dossier = sequelize.define('Dossier', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM('pending', 'in-review', 'approved', 'rejected'),
    defaultValue: 'pending'
  }
});

Dossier.associate = (models) => {
  Dossier.belongsTo(models.User, { as: 'Creator', foreignKey: 'createdBy' });
  Dossier.belongsTo(models.User, { as: 'Assignee', foreignKey: 'assignedTo' });
};

module.exports = Dossier;