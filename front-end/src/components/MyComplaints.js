import React, { useEffect, useState } from "react";
import "./MyComplaints.css";

const MyComplaints = ({ user }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/userComplaints/${user.id}`);
        if (!response.ok) throw new Error("Failed to fetch complaints");
        const data = await response.json();
        setComplaints(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [user]);

  if (!user) return <p>Loading user info...</p>;

  return (
    <div className="my-complaints-container">
      <h2>My Complaints</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && complaints.length === 0 && <p>No complaints submitted yet.</p>}

      <table className="complaints-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.id}</td>
              <td>{complaint.subject}</td>
              <td>{complaint.status}</td>
              <td>{new Date(complaint.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyComplaints;
