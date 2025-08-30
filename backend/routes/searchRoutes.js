import express from "express";
import Skill from "../models/Skill.js";      // adjust path if different
import Boarding from "../models/Boarding.js"; // if you have this model
import Ad from "../models/Ad.js";             // if you have ads

const router = express.Router();

// Search route
router.get("/search", async (req, res) => {
  const q = req.query.q; // the "hewfh" from ?q=hewfh

  try {
    if (!q || q.trim() === "") {
      return res.json({ success: true, items: [] });
    }

    // 🔍 Search example: skills + boardings + ads
    const skills = await Skill.find({
      $or: [
        { skillType: { $regex: q, $options: "i" } },
        { studentName: { $regex: q, $options: "i" } }
      ]
    });

    const boardings = await Boarding.find({
      $or: [
        { location: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ]
    });

    const ads = await Ad.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ]
    });

    // Merge results
    const results = [...skills, ...boardings, ...ads];

    res.json({ success: true, items: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
