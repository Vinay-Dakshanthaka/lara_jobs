// sequence.js
const { Model, DataTypes } = require('sequelize');
const { createDatabaseIfNotExists } = require('../config/dbConfig');

// Define a model for managing the sequence numbers for each day
const initializeSequelize = async () => {
  const sequelize = await createDatabaseIfNotExists(); // Get the sequelize instance

  class Sequence extends Model {}

  Sequence.init(
    {
      date: {
        type: DataTypes.STRING, // Format as YYYYMMDD
        allowNull: false,
        unique: true, // Only one sequence per day
      },
      sequence: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'Sequence',
      tableName: 'sequences',
      timestamps: false, // No timestamps needed for the sequence table
    }
  );
};

module.exports = { initializeSequelize, Sequence };
