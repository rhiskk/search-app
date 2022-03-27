const { DataTypes } = require("sequelize");

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable("cats", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            weight: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        });
        await queryInterface.createTable("breed_groups", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        });
        await queryInterface.addColumn("cats", "breed_group_id", {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "breed_groups", key: "id" },
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable("cats");
        await queryInterface.dropTable("breed_groups");
    },
};