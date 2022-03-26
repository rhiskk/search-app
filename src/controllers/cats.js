const router = require("express").Router();
const { Cat, BreedGroup } = require("../models");

router.get("/", async (_req, res) => {
    const cats = await Cat.findAll({
        attributes: { exclude: ["breedGroupId", "createdAt", "updatedAt"] },
        include: {
            model: BreedGroup,
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        }
    });
    res.json(cats)
})

router.get("/:id", async (req, res) => {
    const cat = await Cat.findByPk(req.params.id, {
        attributes: { exclude: ["breedGroupId", "createdAt", "updatedAt"] },
        include: {
            model: BreedGroup,
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        }
    });
    if (cat) {
        res.json(cat)
    } else {
        res.status(204).end();
    }
})

router.post("/", async (req, res) => {
    try {
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
        console.log(err);
    }
})

router.delete("/:id", async (req, res) => {
    cat = await Cat.findByPk(req.params.id)
    if (cat) {
        await cat.destroy();
    }
    res.status(204).end();
});

module.exports = router;