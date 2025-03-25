const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig"); 

const Candidate = sequelize.define('Candidate', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  unique_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: function () {
      // Generate unique_id as YYYYMMDD#### (with sequence number)
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
      const day = String(today.getDate()).padStart(2, '0');
      
      // Sequence number: find the last number for today
      return `${year}${month}${day}0001`; // Initially, the sequence is 0001
    },
  },
  email_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  phone_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  pin_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'candidates',
  timestamps: true,
});

module.exports = Candidate;
