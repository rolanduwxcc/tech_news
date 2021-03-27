const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//create User class/model!
class User extends Model {};

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
        hooks: {
            //hash a password before storing it
            // beforeCreate(userData) {
            //     return bcrypt.hash(userData.password, 10).then(hashedPassword => {
            //         newUserData.password = hashedPassword;
            //         return newUserData;
            //     });
            // }
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            //set up beforeUpdate hook
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
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