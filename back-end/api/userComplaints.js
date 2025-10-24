// backend/api/userComplaints.js
import express from "express";
import pool from "../Service.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      `SELECT id, subject, status, created_at 
       FROM complaints 
       WHERE user_id = ? 
       ORDER BY created_at DESC`,
      [userId]
    );
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user complaints" });
  }
});

export default router;
