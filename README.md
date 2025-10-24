# Resolve-IT: Feedback and Grievance Management System

**Resolve-IT** is a web-based application designed to streamline the process of submitting, tracking, and resolving complaints or grievances. It provides a centralized platform for users to submit feedback or complaints and allows administrators to manage, monitor, and escalate issues efficiently.

---

## **Key Features**

### **For Users**

* **Submit Complaints:** Users can submit complaints with details such as subject, category, urgency, and description.
* **Track Status:** Users can track the status of their complaints in real-time.
* **Complaint History:** Users can view all their submitted complaints along with timelines and status updates.
* **Anonymous Submission:** Option to submit complaints anonymously.

### **For Admins**

* **Manage Complaints:** Admins can view, update, and manage all complaints submitted by users.
* **Escalation Workflow:** Complaints can be escalated to higher authorities if not resolved in a timely manner.
* **Status Logs:** Maintain detailed logs of complaint status changes and comments for transparency.
* **Reports and Analytics:** Visual dashboards display complaint trends by category, status, and time.
* **Export Options:** Export complaint summaries and reports in CSV or PDF for audits and external reporting.

### **Additional Features**

* **User Authentication:** Secure login and signup system.
* **Role-Based Access:** Different access levels for users and admins.
* **Responsive UI:** User-friendly interface that works across devices.

---


## **Modules**

1. **User Module** – Submit and track complaints.
2. **Admin Module** – Manage complaints, escalate issues, and generate reports.
3. **Escalation Logic** – Auto-escalation and higher authority dashboard.
4. **Reports & Export** – Analytics, trends, CSV/PDF export.

---

## **Getting Started**

1. **Clone the repository**

   ```bash
   git clone <repository_url>
   cd Resolve-IT
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Run backend**

   ```bash
   node server
   ```
4. **Run frontend**

   ```bash
   npm start
   ```

---

## **Database**

* **Users Table:** Stores user details and roles.
* **Complaints Table:** Stores all complaints submitted by users.
* **Status Logs:** Tracks updates to complaints.
* **Escalations:** Stores escalation history for unresolved complaints.

---

## **Purpose**

This system simplifies grievance management, ensures timely resolution, enhances transparency, and provides actionable insights through reports and analytics.
