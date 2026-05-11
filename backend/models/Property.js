const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  beds: Number,
  baths: Number,
  area: String,
  tag: String,
  image: String,
  location: String
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);