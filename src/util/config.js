require("dotenv").config();

module.exports = {
    PG_DB: process.env.POSTGRES_DB || "search-app",
    PG_USER: process.env.POSTGRES_USER || "postgres",
    PG_PASSWORD: process.env.POSTGRES_PASSWORD || "postgres",
    DB_HOST: process.env.DB_HOST || "localhost",
    PORT: process.env.PORT || 3001,
};