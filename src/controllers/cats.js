const router = require("express").Router();
const { literal, Op } = require("sequelize");
const { Cat, BreedGroup } = require("../models");

const catAttributes = [
    "id",
    "name",
    "weight",
    [literal("breed_group.name"), "breedGroup"]
];

router.get("/", async (req, res) => {
    const where = {};
    if (req.query.name) {
        where.name = {
            [Op.substring]: req.query.name
        };
    }
    const cats = await Cat.findAll({
        include: {
            model: BreedGroup,
            attributes: []
        },
        attributes: catAttributes,
        where
    });
    res.json(cats);
});

router.get("/:id", async (req, res) => {
    const cat = await Cat.findByPk(req.params.id, {
        include: {
            model: BreedGroup,
            attributes: []
        },
        attributes: catAttributes
    });
    if (cat) {
        res.json(cat);
    } else {
        res.status(404).end();
    }
});

router.post("/", async (req, res, next) => {
    try {
        // eslint-disable-next-line no-unused-vars
        const [breedGroup, _created] = await BreedGroup.findOrCreate({
            where: { name: req.body.breedGroup }
        });
        const cat = await Cat.create({
            name: req.body.name,
            weight: req.body.weight,
            breedGroupId: breedGroup.id
        });
        res.status(201).json(cat).end();
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res) => {
    const cat = await Cat.findByPk(req.params.id);
    if (cat) {
        await cat.destroy();
    }
    res.status(204).end();
});

module.exports = router;