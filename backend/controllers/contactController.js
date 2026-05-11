const Contact = require("../models/Contact");

exports.submitContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();

    res.status(200).json({ message: "Inquiry sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting form" });
  }
};