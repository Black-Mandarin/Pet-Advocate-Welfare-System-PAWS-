const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Booking extends Model { }

Booking.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        date_dropoff: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        date_pickup: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fee: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        staff_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'staff',
                key: 'id',
            },
        },
        pet_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'pet',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'booking',
    }
);

module.exports = Booking;
