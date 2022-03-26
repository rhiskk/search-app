const Sequelize = require("sequelize");
const { PG_DB, PG_USER, PG_PASSWORD, DB_HOST } = require("./config");

const sequelize = new Sequelize(PG_DB, PG_USER, PG_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres'
});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection has been established successfully.");
    } catch (err) {
        console.log("Unable to connect to the database:", err);
        return process.exit(1);
    }
    return null;
};



module.exports = { connectToDatabase };
