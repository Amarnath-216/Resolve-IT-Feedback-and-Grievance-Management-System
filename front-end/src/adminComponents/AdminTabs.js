import React from "react";
import { Link } from "react-router-dom";
import "./AdminTabs.css";
import { ClipboardCheck, FileText,  TrendingUp , FolderOpen } from "lucide-react"; 

const adminFeatures = [
  {
    title: "Manage Complaints",
    description: "Assign, update, and resolve complaints efficiently.",
    icon: <ClipboardCheck size={28} strokeWidth={2.2} />,
    link: "/admindashboard/managecomplaints",
  },
  {
    title: "Escalate Complaints",
    description: "Escalate Unresolved Complaints to Higher Authority ",
    icon: <FileText size={28} strokeWidth={2.2} />,
    link: "/admindashboard/escalatecomplaint",
  },
//  {
//    title: "Internal Notes",
//    description: "Add private notes visible only to staff for collaboration.",
//    icon: <FileText size={28} strokeWidth={2.2} />,
//    link: "/admindashboard/internal-notes",
//  },
  {
    title: "Reports",
    description: "Visual dashboards show trends by category, status, and time",
    icon: < TrendingUp  size={28} strokeWidth={2.2} />,
    link: "/admindashboard/reports",
  },
  {
    title: "All Complaints",
    description: "View, filter, and track all complaints in one place.",
    icon: <FolderOpen size={28} strokeWidth={2.2} />,
    link: "/admindashboard/allcomplaints",
  },
];

const AdminTabs = () => {
  return (
    <div className="admin-tabs-container">
      <h2 className="section-title">Admin Features</h2>
      <div className="feature-cards">
        {adminFeatures.map((feature, idx) => (
          <Link to={feature.link} key={idx} className="feature-card">
            <div className="feature-info">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
            <div className="feature-icon">{feature.icon}</div>
            <span className="arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminTabs;
