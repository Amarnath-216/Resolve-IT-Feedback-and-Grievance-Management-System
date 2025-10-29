import React, { useState, useEffect, useCallback } from "react";
import emailjs from "emailjs-com";
import "./EscalateComplaint.css";

const EscalateComplaint = () => {
  const [pendingComplaints, setPendingComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [selectedAuthority, setSelectedAuthority] = useState("");
  const [notifyAll, setNotifyAll] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Map higher authorities to their real user IDs
  const higherAuthorities = [
    { id: 39, name: "Senior Admin" },
    // Add more if needed
  ];

  const SERVICE_ID = "service_5sr0lbo"; // your EmailJS service ID
  const TEMPLATE_ID = "template_wwq15bn"; // your EmailJS template ID
  const USER_ID = "1QEsYwa5Wz3C8ogQa"; // your EmailJS user ID

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 2500);
  };

  const fetchPendingComplaints = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/api/escalate/pending");
      const data = await res.json();
      const complaintsArray = Array.isArray(data) ? data : [];
      setPendingComplaints(complaintsArray);
      if (!selectedComplaint && complaintsArray.length > 0)
        setSelectedComplaint(complaintsArray[0]);
    } catch (err) {
      console.error(err);
      showToast("Failed to load unresolved complaints", "error");
    }
  }, [selectedComplaint]);

  useEffect(() => {
    fetchPendingComplaints();
  }, [fetchPendingComplaints]);

  // Function to send email via EmailJS
  const sendNotificationEmail = (userEmail, complaintId, authorityName) => {
    const templateParams = {
      to_email: userEmail,
      complaint_id: complaintId,
      authority_name: authorityName,
      reply_to: "", // optional: remove reply-to
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then(
        (response) => {
          console.log("Email sent successfully!", response.status, response.text);
        },
        (err) => {
          console.error("Failed to send email:", err);
        }
      );
  };

  const handleEscalate = async () => {
    if (!selectedAuthority) {
      showToast("Select a higher authority", "error");
      return;
    }

    const selectedAuthObj = higherAuthorities.find(
      (a) => a.id === Number(selectedAuthority)
    );

    try {
      const res = await fetch(
        `http://localhost:5000/api/escalate/${selectedComplaint.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            escalated_to: Number(selectedAuthority),
            reason: `Escalated to ${selectedAuthObj?.name} by Admin${
              notifyAll ? " (All parties notified)" : ""
            }`,
            escalated_by: 38,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        showToast("Escalated successfully", "success");
        fetchPendingComplaints();

        // ✅ Send email if Notify All is checked
        if (notifyAll) {
          sendNotificationEmail(
            selectedComplaint.userEmail,
            selectedComplaint.id,
            selectedAuthObj?.name
          );
        }
      } else {
        showToast(data.message || "Failed to escalate", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Something went wrong", "error");
    }
  };

  return (
    <div className="escalate-container">
      {toast.show && <div className={`toast ${toast.type}`}>{toast.message}</div>}

      <h2 className="escalate-header">Escalate Complaint</h2>

      <div className="escalate-body">
        {/* Sidebar */}
        <div className="sidebar-upgraded">
          <h3>Unresolved Complaints</h3>
          {pendingComplaints.length === 0 ? (
            <p className="no-data">No unresolved complaints</p>
          ) : (
            pendingComplaints.map((c) => (
              <li
                key={c.id}
                className={selectedComplaint?.id === c.id ? "selected" : ""}
                onClick={() => setSelectedComplaint(c)}
              >
                <div className="list-left">
                  <span className="list-title">{c.subject}</span>
                  <span className="list-id">ID: {c.id}</span>
                </div>
                <span
                  className={`list-status status-${c.status
                    .replace(/\s/g, "")
                    .toLowerCase()}`}
                >
                  {c.status}
                </span>
              </li>
            ))
          )}
        </div>

        {/* Main panel */}
        <div className="main-panel">
          {selectedComplaint && (
            <>
              <div className="complaint-details">
                <div className="icon">📄</div>
                <div>
                  <p className="complaint-title">{selectedComplaint.subject}</p>
                  <p className="complaint-id">
                    Complaint ID: {selectedComplaint.id}
                  </p>
                  <p className="complaint-user">
                    User: {selectedComplaint.userEmail}
                  </p>
                </div>
              </div>

              <div className="form-section">
                <label className="form-label">Escalation Options</label>
                <select
                  className="dropdown"
                  value={selectedAuthority}
                  onChange={(e) => setSelectedAuthority(e.target.value)}
                >
                  <option value="">Select Higher Authority</option>
                  {higherAuthorities.map((auth) => (
                    <option key={auth.id} value={auth.id}>
                      {auth.name}
                    </option>
                  ))}
                </select>

                <div className="notify-toggle">
                  <label>Notify All Parties</label>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={notifyAll}
                      onChange={() => setNotifyAll(!notifyAll)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

              <button className="escalate-btn" onClick={handleEscalate}>
                Escalate Complaint
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EscalateComplaint;
