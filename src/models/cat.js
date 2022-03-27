const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

class Cat extends Model { }

Cat.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: [0.01],
                    msg: "Weight must be greater than 0.01 kilograms"
                }
            }
        }
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: "cat"
    }
);

module.exports = Cat;