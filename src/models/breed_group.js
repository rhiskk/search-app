const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

class BreedGroup extends Model { }

BreedGroup.init(
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
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: 'breed_group'
    }
);

module.exports = BreedGroup;