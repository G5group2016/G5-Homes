const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// ── ADMIN PASSWORD CHECK (simple header-based auth) ──────────────
// The frontend sends: Authorization: Bearer <ADMIN_PASSWORD>
const adminAuth = (req, res, next) => {
  const auth = req.headers.authorization || "";
  const token = auth.replace("Bearer ", "").trim();
  if (!token || token !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

// ── PUBLIC: Submit a new inquiry ─────────────────────────────────
// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, service } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    const inquiry = await Contact.create({ name, email, phone, service });
    res.status(201).json({ message: "Inquiry submitted successfully.", inquiry });
  } catch (err) {
    console.error("Contact submit error:", err.message);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// ── ADMIN: Get all inquiries (with optional filter & search) ──────
// GET /api/contact/admin?status=new&search=john&page=1&limit=10
router.get("/admin", adminAuth, async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;

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
    console.error("Admin fetch error:", err.message);
    res.status(500).json({ message: "Server error." });
  }
});

// ── ADMIN: Get stats (counts by status) ──────────────────────────
// GET /api/contact/admin/stats
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

// ── ADMIN: Update inquiry status ──────────────────────────────────
// PATCH /api/contact/admin/:id
router.patch("/admin/:id", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found." });
    res.json({ message: "Status updated.", inquiry });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

// ── ADMIN: Delete inquiry ─────────────────────────────────────────
// DELETE /api/contact/admin/:id
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