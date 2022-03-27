const express = require("express");
const app = express();
const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");
const { unknownEndpoint, errorHandler } = require("./util/middleware");
const catsRouter = require("./controllers/cats");

app.use(express.json());
app.use("/api/cats", catsRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

const start = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

start();