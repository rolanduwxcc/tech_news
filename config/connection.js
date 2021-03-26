//calling Sequelize's connection contructor function!!!
//import the Sequelize contructor form the library
const Sequelize = require('sequelize');

//not saving this to a variable just need to execute
require('dotenv').config();

//create connection to DB, pass in MySQL info for username/pass
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });



module.exports = sequelize;