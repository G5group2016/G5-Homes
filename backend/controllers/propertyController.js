const Property = require("../models/Property");

// GET all properties
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD property (admin use later)
exports.addProperty = async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    const saved = await newProperty.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};