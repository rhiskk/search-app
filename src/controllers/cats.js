const router = require("express").Router();
const { literal } = require("sequelize");
const { Cat, BreedGroup } = require("../models");

const catAttributes = [
	"id",
	"name",
	"weight",
	[literal("breed_group.name"), "breedGroup"]
];

router.get("/", async (_req, res) => {
	const cats = await Cat.findAll({
		include: {
			model: BreedGroup,
			attributes: []
		},
		attributes: catAttributes

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
		res.status(204).end();
	}
});

router.post("/", async (req, res) => {
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
		console.log(err);
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