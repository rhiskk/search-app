const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
    if (err.name === "SequelizeDatabaseError") {
        return res.status(400).json({ error: err.message });
    } else if (err.name === "SequelizeValidationError") {
        return res.status(400).json({ error: err.message });
    }
    next(err);
};

module.exports = {
    unknownEndpoint,
    errorHandler,
};
