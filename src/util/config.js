require("dotenv").config();

const PG_DB = process.env.NODE_ENV === "test"
    ? process.env.TEST_DB || "test-app"
    : process.env.POSTGRES_DB || "search-app";

module.exports = {
    PG_DB,
    PG_USER: process.env.POSTGRES_USER || "postgres",
    PG_PASSWORD: process.env.POSTGRES_PASSWORD || "postgres",
    DB_HOST: process.env.DB_HOST || "localhost",
    PORT: process.env.PORT || 3001,
};