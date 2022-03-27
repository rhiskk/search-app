const express = require("express");
const app = express();
const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");
const catsRouter = require("./controllers/cats");

app.use(express.json());
app.use("/api/cats", catsRouter);

const start = async () => {
	await connectToDatabase();
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

start();