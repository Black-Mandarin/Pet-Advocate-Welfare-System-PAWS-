const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Pet extends Model { }

Pet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        pet_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        owner_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        pet_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        pet_breed: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pet_notes: {
            type: DataTypes.TEXT,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "pet",
    }
);

module.exports = Pet;
