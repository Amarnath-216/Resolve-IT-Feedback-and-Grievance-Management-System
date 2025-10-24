import express from "express";
import pool from "../Service.js";

const router = express.Router();

// GET pending complaints
router.get("/pending", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT c.id, c.subject, c.status, u.email AS userEmail
      FROM complaints c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.status IN ('Submitted', 'Under Review')
      ORDER BY c.updated_at ASC
    `);
    connection.release();

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch pending complaints" });
  }
});

// Manual escalation
router.post("/:id", async (req, res) => {
  const complaintId = parseInt(req.params.id, 10);
  const { escalated_to, reason, escalated_by } = req.body;

  if (!reason || reason.trim() === "") {
    return res.status(400).json({ message: "Escalation reason required" });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Update complaint status
    await connection.query(
      `UPDATE complaints SET status='Escalated', updated_at=NOW() WHERE id=?`,
      [complaintId]
    );

    // Insert into escalations
    await connection.query(
      `INSERT INTO escalations (complaint_id, escalated_to, reason, escalated_at) VALUES (?, ?, ?, NOW())`,
      [complaintId, escalated_to || null, reason]
    );

    // Insert into statuslogs
    await connection.query(
      `INSERT INTO statuslogs (complaint_id, status, comment, updated_by) VALUES (?, ?, ?, ?)`,
      [complaintId, "Escalated", reason, escalated_by || 38] // Use Admin ID 38
    );

    await connection.commit();
    connection.release();

    res.json({ message: "Complaint escalated successfully", complaint_id: complaintId });
  } catch (err) {
    await connection.rollback();
    connection.release();
    console.error(err);
    res.status(500).json({ message: "Failed to escalate complaint" });
  }
});

// GET all escalated complaints
router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT c.id, c.subject, c.status, e.escalated_to, e.reason, e.escalated_at
      FROM complaints c
      LEFT JOIN escalations e ON c.id = e.complaint_id
      WHERE c.status='Escalated'
      ORDER BY c.updated_at DESC
    `);
    connection.release();

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch escalated complaints" });
  }
});

export default router;
