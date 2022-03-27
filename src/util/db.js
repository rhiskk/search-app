const Sequelize = require("sequelize");
const { PG_DB, PG_USER, PG_PASSWORD, DB_HOST } = require("./config");
const { Umzug, SequelizeStorage } = require("umzug");

const sequelize = new Sequelize(PG_DB, PG_USER, PG_PASSWORD, {
	host: DB_HOST,
	dialect: "postgres"
});

const connectToDatabase = async () => {
	try {
		await sequelize.authenticate();
		await runMigrations();
		console.log("Database connection has been established successfully.");
	} catch (err) {
		console.log("Unable to connect to the database:", err);
		return process.exit(1);
	}
	return null;
};

const migrationConf = {
	migrations: {
		glob: "src/migrations/*.js",
	},
	storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
	context: sequelize.getQueryInterface(),
	logger: console,
};

const runMigrations = async () => {
	const migrator = new Umzug(migrationConf);
	const migrations = await migrator.up();
	console.log("Migrations up to date", {
		files: migrations.map((mig) => mig.name),
	});
};
const rollbackMigration = async () => {
	await sequelize.authenticate();
	const migrator = new Umzug(migrationConf);
	await migrator.down();
};

module.exports = { connectToDatabase, sequelize, rollbackMigration };
