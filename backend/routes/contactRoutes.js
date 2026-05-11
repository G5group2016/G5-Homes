const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// ── ADMIN AUTH ────────────────────────────────────────────────────────────
const adminAuth = (req, res, next) => {
  const auth = req.headers.authorization || "";
  const token = auth.replace("Bearer ", "").trim();
  if (!token || token !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

// ── PUBLIC: Submit a new inquiry ──────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, service } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email, and phone number are required." });
    }

    const nameTrimmed = name.trim();
    if (nameTrimmed.length < 2) {
      return res.status(400).json({ message: "Name must be at least 2 characters." });
    }
    if (/[^a-zA-Z\s]/.test(nameTrimmed)) {
      return res.status(400).json({ message: "Name must not contain numbers or special characters." });
    }

    const emailTrimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      return res.status(400).json({ message: "Phone number must be exactly 10 digits." });
    }
    if (!/^[6-9]/.test(digits)) {
      return res.status(400).json({ message: "Enter a valid Indian mobile number (must start with 6, 7, 8, or 9)." });
    }

    const inquiry = await Contact.create({
      name: nameTrimmed,
      email: emailTrimmed,
      phone: digits,
      service: service || "",
    });

    res.status(201).json({ message: "Inquiry submitted successfully.", inquiry });
  } catch (err) {
    console.error("Contact submit error:", err.message);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// ── ADMIN: Get all inquiries ──────────────────────────────────────────────
router.get("/admin", adminAuth, async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (status && status !== "all") filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }
    const total = await Contact.countDocuments(filter);
    const inquiries = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({ inquiries, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

// ── ADMIN: Stats ──────────────────────────────────────────────────────────
router.get("/admin/stats", adminAuth, async (req, res) => {
  try {
    const [total, newCount, contacted, resolved] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: "new" }),
      Contact.countDocuments({ status: "contacted" }),
      Contact.countDocuments({ status: "resolved" }),
    ]);
    res.json({ total, new: newCount, contacted, resolved });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

// ── ADMIN: Update status ──────────────────────────────────────────────────
router.patch("/admin/:id", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["new", "contacted", "resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }
    const inquiry = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found." });
    res.json({ message: "Status updated.", inquiry });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

// ── ADMIN: Delete ─────────────────────────────────────────────────────────
router.delete("/admin/:id", adminAuth, async (req, res) => {
  try {
    const inquiry = await Contact.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found." });
    res.json({ message: "Inquiry deleted." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;