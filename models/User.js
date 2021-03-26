const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create User class/model!
class User extends Mode {};

//define table columns and configuration
User.init(
    {
        //Table column defs go here
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,  //like SQL's NOT NULL
            primaryKey: true,
            autoIncrement: true
        },
        username: {
                type: DataTypes.STRING,
                allowNull: false
        },
        email: {
            type:  DataTypes.STRING,
            allowNull: false,
            unique: true, //no duplicate emails in table
            //if allowNull is false, we can run data through validators
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4] //pass must be at least 4 chars long
            }
        }
    },
    {
        //Table configuration options go here
        //https://sequelize.org/v5/manual/models-definition.html#configuration
        sequelize, //pass in import connection
        timestamps: false, //updateAt/createdAt fields
        freezeTableName: true, //prevents auto pluralizing table names
        underscored: true, //so it will use _ instead of snake case
        modelName: 'user' //make is so model name is lowercase in db
    }
);



module.exports = User;