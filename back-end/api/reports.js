import express from "express";
import pool from "../Service.js";
import { Parser } from "json2csv";
import pdf from "pdfkit";
import fs from "fs";

const router = express.Router();

// ✅ Complaint trends
router.get("/trends", async (req, res) => {
  try {
    const conn = await pool.getConnection();

    // By Category
    const [byCategory] = await conn.query(
      "SELECT category, COUNT(*) as total FROM complaints GROUP BY category"
    );

    // By Status
    const [byStatus] = await conn.query(
      "SELECT status, COUNT(*) as total FROM complaints GROUP BY status"
    );

    // By Day (last 30 days)
    const [byDay] = await conn.query(
      `SELECT DATE(created_at) as date, COUNT(*) as total 
       FROM complaints 
       WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
       GROUP BY DATE(created_at)
       ORDER BY DATE(created_at) ASC`
    );

    conn.release();
    res.json({ byCategory, byStatus, byDay });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch trends" });
  }
});

// ✅ Export CSV
router.get("/export/csv", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query("SELECT * FROM complaints");
    conn.release();

    const parser = new Parser();
    const csv = parser.parse(rows);

    res.header("Content-Type", "text/csv");
    res.attachment("complaints_report.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).send("CSV export failed");
  }
});

// ✅ Export PDF
router.get("/export/pdf", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query("SELECT * FROM complaints");
    conn.release();

    const doc = new pdf();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=complaints_report.pdf");
    doc.pipe(res);

    doc.fontSize(18).text("Complaints Report", { align: "center" });
    doc.moveDown();

    rows.forEach((row) => {
      doc.fontSize(12).text(
        `ID: ${row.id} | Subject: ${row.subject} | Status: ${row.status} | Category: ${row.category} | Submitted: ${row.created_at}`
      );
      doc.moveDown(0.5);
    });

    doc.end();
  } catch (err) {
    res.status(500).send("PDF export failed");
  }
});

export default router;
