const Cat = require("./cat");
const BreedGroup = require("./breed_group");

BreedGroup.hasMany(Cat);
Cat.belongsTo(BreedGroup);

module.exports = {
    Cat,
    BreedGroup,
};