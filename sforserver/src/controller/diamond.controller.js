const { Diamond } = require("../models");

const createDiamond = async (req, res) => {
  try {
    const { name, baseDiamondPrice } = req.body;

    if (!name || !baseDiamondPrice) {
      return res.status(400).json({ message: "All fields required" });
    }

    const diamond = await Diamond.create({
      name,
      baseDiamondPrice,
    });

    res.status(201).json(diamond);
  } catch (error) {
    res.status(500).json({ message: "Diamond creation failed" });
  }
};

const getDiamonds = async (req, res) => {
  const diamonds = await Diamond.findAll({ order: [["createdAt", "DESC"]] });
  res.json(diamonds);
};

module.exports = { createDiamond, getDiamonds };
