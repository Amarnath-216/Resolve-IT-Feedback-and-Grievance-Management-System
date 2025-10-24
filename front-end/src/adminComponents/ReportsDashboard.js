import React, { useEffect, useState } from "react";
import "./ReportsDashboard.css";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#FF7F00", "#00C49F", "#FFBB28", "#FF4C4C", "#8884D8"];

const ReportsDashboard = () => {
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/reports/trends");
        const data = await res.json();
        setTrends(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrends();
  }, []);

  const exportCSV = () => window.open("http://localhost:5000/api/reports/export/csv", "_blank");
  const exportPDF = () => window.open("http://localhost:5000/api/reports/export/pdf", "_blank");

  if (loading) return <p>Loading trends...</p>;

  return (
    <div className="reports-container">
      <h2>Admin Reports & Export</h2>

      <div className="reports-buttons">
        <button onClick={exportCSV}>Export CSV</button>
        <button onClick={exportPDF}>Export PDF</button>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>Complaints by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trends.byCategory}
                dataKey="total"
                nameKey="category"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {trends.byCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Complaints by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trends.byStatus}
                dataKey="total"
                nameKey="status"
                outerRadius={100}
                fill="#82ca9d"
                label
              >
                {trends.byStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Complaints Over Time (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trends.byDay}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#FF7F00" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportsDashboard;
