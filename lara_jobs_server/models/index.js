const { sequelize, createDatabaseIfNotExists } = require('../config/dbConfig');

// ================== model imports ========================== 
const Candidate = require('./candidate');
const OTPVerification = require('./otpVerfication');

const initDatabase = async () => {
  try {
    // Creates the database if it doesn't exist
    await createDatabaseIfNotExists();

    // Sync all models  with the database and the models present in the code 
    await sequelize.sync({ alter: false });  //this {alter : true} will add newly added column to the table without dropping them 

    console.log('Database and tables created successfully!');
  } catch (error) {
    console.error('Error initializing the database:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  initDatabase,
  Candidate,
  OTPVerification
}