import {
    LayoutDashboard,
    FileText,
    AlertTriangle,
    Clock3,
    CheckCircle2,
    ArrowUpRight,
    Filter,
    X,
    Brain,
    Building2,
    MapPin,
    CalendarDays,
    Search,
  } from "lucide-react";
  
  import { useEffect, useState } from "react";
  
  function Admin() {
    const [selectedGrievance, setSelectedGrievance] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [departments, setDepartments] = useState([]);
    const [grievances, setGrievances] = useState([]);
    useEffect(() => {
      Promise.all([
        fetch("http://localhost:5000/api/admin/complaints").then((res) =>
          res.json()
        ),
        fetch("http://127.0.0.1:8004/api/departments").then((res) =>
          res.json()
        ),
      ])
      .then(([complaints, departments]) => {
        setDepartments(departments);
      
        const formattedComplaints = complaints.map((complaint) => {
            const department = departments.find(
              (dept) => dept.id === complaint.department_id
            );
    
            return {
              ...complaint,
              id: `NS-${String(complaint.id).padStart(6, "0")}`,
              title: complaint.description?.split("\n")[0] || "Grievance",
              department: department?.name || "Unassigned",
              priority: String(complaint.priority || "LOW").toUpperCase(),
              status:
                String(complaint.status || "Pending")
                  .charAt(0)
                  .toUpperCase() +
                String(complaint.status || "Pending").slice(1),
              description: complaint.description || "",
              category: complaint.category || "Uncategorized",
            };
          });
    
          setGrievances(formattedComplaints);
        })
        .catch((error) =>
          console.error("Failed to fetch complaints:", error)
        );
    }, []);
   
  
    const filteredGrievances = grievances.filter((grievance) => {
      const matchesSearch =
      String(grievance.id).toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        grievance.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        grievance.department
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
  
      const matchesPriority =
        priorityFilter === "ALL" ||
        grievance.priority === priorityFilter;
  
      const matchesStatus =
        statusFilter === "ALL" ||
        grievance.status === statusFilter;
  
      return (
        matchesSearch &&
        matchesPriority &&
        matchesStatus
      );
    });
  
    return (
      <section className="admin-page">
  
        <div className="admin-container">
  
          {/* HEADER */}
  
          <div className="admin-header">
  
            <div>
              <span className="section-eyebrow">
                NYAYSETU ADMINISTRATION
              </span>
  
              <h1>Grievance Overview</h1>
  
              <p>
                Monitor incoming grievances, AI classifications,
                priorities and departmental routing.
              </p>
            </div>
  
            <div className="admin-date">
              <span>LAST UPDATED</span>
              <strong>Today · 20:40 IST</strong>
            </div>
  
          </div>
  
          {/* LAYOUT */}
  
          <div className="admin-layout">
  
            {/* SIDEBAR */}
  
            <aside className="admin-sidebar">
  
              <div className="sidebar-brand">
                <LayoutDashboard size={18} />
                Administration
              </div>
  
              <nav>
  
                <a href="#overview" className="active">
                  Overview
                </a>
  
                <a href="#grievances">
                  All Grievances
                </a>
  
                <a href="#departments">
                  Departments
                </a>
  
              </nav>
  
              <div className="sidebar-bottom">
  
                <span>System Status</span>
  
                <div>
                  <span className="status-dot"></span>
                  Operational
                </div>
  
              </div>
  
            </aside>
  
            {/* CONTENT */}
  
            <main className="admin-content">
  
              {/* STATS */}
  
              <div className="admin-stats">
  
                <div className="admin-stat">
  
                  <div className="stat-icon">
                    <FileText size={18} />
                  </div>
  
                  <span>Total Grievances</span>
  
                  <strong>{grievances.length}</strong>
  
                  <small>
                    +12% this week
                  </small>
  
                </div>
  
                <div className="admin-stat">
  
                  <div className="stat-icon priority-stat">
                    <AlertTriangle size={18} />
                  </div>
  
                  <span>High Priority</span>
  
                  <strong>
  {grievances.filter((g) => g.priority === "HIGH").length}
</strong>
  
                  <small>
                    Requires attention
                  </small>
  
                </div>
  
                <div className="admin-stat">
  
                  <div className="stat-icon pending-stat">
                    <Clock3 size={18} />
                  </div>
  
                  <span>In Progress</span>
  
                  <strong>
  {grievances.filter((g) => g.status === "In Progress").length}
</strong>
  
                  <small>
                    Across departments
                  </small>
  
                </div>
  
                <div className="admin-stat">
  
                  <div className="stat-icon resolved-stat">
                    <CheckCircle2 size={18} />
                  </div>
  
                  <span>Resolved</span>
  
                  <strong>
  {grievances.filter((g) => g.status === "Resolved").length}
</strong>
  
                  <small>
                  {grievances.length > 0
  ? `${Math.round(
      (grievances.filter((g) => g.status === "Resolved").length /
        grievances.length) *
        100
    )}% resolution rate`
  : "0% resolution rate"}
                  </small>
  
                </div>
  
              </div>
  
              {/* GRIEVANCES */}
  
              <div
                className="admin-panel"
                id="grievances"
              >
  
                <div className="panel-header">
  
                  <div>
  
                    <h2>Recent Grievances</h2>
  
                    <p>
                      Latest complaints processed by NyaySetu.
                    </p>
  
                  </div>
  
                </div>
  
                {/* SEARCH + FILTERS */}
  
                <div className="admin-filters">
  
                  <div className="admin-search">
  
                    <Search size={15} />
  
                    <input
                      type="text"
                      placeholder="Search grievance..."
                      value={searchTerm}
                      onChange={(e) =>
                        setSearchTerm(e.target.value)
                      }
                    />
  
                  </div>
  
                  <div className="filter-group">
  
                    <Filter size={14} />
  
                    <select
                      value={priorityFilter}
                      onChange={(e) =>
                        setPriorityFilter(e.target.value)
                      }
                    >
                      <option value="ALL">
                        All Priority
                      </option>
  
                      <option value="HIGH">
                        High
                      </option>
  
                      <option value="MEDIUM">
                        Medium
                      </option>
  
                      <option value="LOW">
                        Low
                      </option>
  
                    </select>
  
                  </div>
  
                  <div className="filter-group">
  
                    <select
                      value={statusFilter}
                      onChange={(e) =>
                        setStatusFilter(e.target.value)
                      }
                    >
  
                      <option value="ALL">
                        All Status
                      </option>
  
                      <option value="In Progress">
                        In Progress
                      </option>
  
                      <option value="Assigned">
                        Assigned
                      </option>
  
                      <option value="Resolved">
                        Resolved
                      </option>
  
                    </select>
  
                  </div>
  
                </div>
  
                {/* TABLE */}
  
                <div className="grievance-table">
  
                  <div className="table-row table-heading">
  
                    <span>ID</span>
                    <span>Grievance</span>
                    <span>Priority</span>
                    <span>Department</span>
                    <span>Status</span>
  
                  </div>
  
                  {filteredGrievances.length > 0 ? (
  
                    filteredGrievances.map(
                      (grievance) => (
  
                        <div
                          key={grievance.id}
                          className="table-row grievance-clickable"
                          onClick={() =>
                            setSelectedGrievance(
                              grievance
                            )
                          }
                        >
  
                          <span className="grievance-id-cell">
                            {grievance.id}
                          </span>
  
                          <span>
                            {grievance.title}
                          </span>
  
                          <span>
  
                            <span
                              className={`priority-badge ${
                                grievance.priority === "HIGH"
                                  ? "high"
                                  : grievance.priority ===
                                    "MEDIUM"
                                  ? "medium"
                                  : "low"
                              }`}
                            >
                              {grievance.priority}
                            </span>
  
                          </span>
  
                          <span>
                            {grievance.department}
                          </span>
  
                          <span>
  
                            <span
                              className={`table-status ${
                                grievance.status ===
                                "Resolved"
                                  ? "resolved"
                                  : ""
                              }`}
                            >
                              {grievance.status}
                            </span>
  
                          </span>
  
                        </div>
  
                      )
                    )
  
                  ) : (
  
                    <div className="no-results">
                      No grievances match your search.
                    </div>
  
                  )}
  
                </div>
  
                <div className="results-count">
                  Showing {filteredGrievances.length} of{" "}
                  {grievances.length} grievances
                </div>
  
              </div>
  
            </main>
  
          </div>
  
        </div>
  
        {/* DETAIL PANEL */}
  
        {selectedGrievance && (
  
          <div className="grievance-detail-overlay">
  
            <div className="grievance-detail-panel">
  
              <div className="detail-header">
  
                <div>
  
                  <span className="section-eyebrow">
                    GRIEVANCE DETAILS
                  </span>
  
                  <h2>
                    {selectedGrievance.title}
                  </h2>
  
                  <span className="detail-id">
                    {selectedGrievance.id}
                  </span>
  
                </div>
  
                <button
                  className="detail-close"
                  onClick={() =>
                    setSelectedGrievance(null)
                  }
                >
                  <X size={19} />
                </button>
  
              </div>
  
              <div className="detail-grid">
  
                <div className="detail-box">
  
                  <span>AI CATEGORY</span>
  
                  <select
  value={selectedGrievance.department}
  onChange={async (e) => {
    const newDepartment = e.target.value;

    const selectedDept = departments.find(
      (dept) => dept.name === newDepartment
    );

    const response = await fetch(
      `http://localhost:5000/api/admin/complaints/${selectedGrievance.id.replace("NS-", "").replace(/^0+/, "")}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          department_id: selectedDept.id,
        }),
      }
    );

    if (response.ok) {
      setSelectedGrievance({
        ...selectedGrievance,
        department: newDepartment,
      });

      setGrievances((prev) =>
        prev.map((g) =>
          g.id === selectedGrievance.id
            ? { ...g, department: newDepartment }
            : g
        )
      );
    }
  }}
>
  {departments.map((dept) => (
    <option key={dept.id} value={dept.name}>
      {dept.name}
    </option>
  ))}
</select>
  
                </div>
                <div className="admin-controls">
  <label>
    Status
    <select
  value={selectedGrievance.status}
  onChange={async (e) => {
    const newStatus = e.target.value;

    const response = await fetch(
      `http://localhost:5000/api/admin/complaints/${selectedGrievance.id.replace("NS-", "").replace(/^0+/, "")}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    if (response.ok) {
      setSelectedGrievance({
        ...selectedGrievance,
        status: newStatus,
      });

      setGrievances((prev) =>
        prev.map((g) =>
          g.id === selectedGrievance.id
            ? { ...g, status: newStatus }
            : g
        )
      );
    }
  }}
>
      <option>Pending</option>
      <option>Assigned</option>
      <option>In Progress</option>
      <option>Resolved</option>
    </select>
  </label>
</div>
  
                <div className="detail-box">
  
                  <span>PRIORITY</span>
  
                  <select
  className="detail-priority"
  value={selectedGrievance.priority}
  onChange={async (e) => {
    const newPriority = e.target.value;

    const response = await fetch(
      `http://localhost:5000/api/admin/complaints/${selectedGrievance.id.replace("NS-", "").replace(/^0+/, "")}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priority: newPriority,
        }),
      }
    );

    if (response.ok) {
      setSelectedGrievance({
        ...selectedGrievance,
        priority: newPriority,
      });

      setGrievances((prev) =>
        prev.map((g) =>
          g.id === selectedGrievance.id
            ? { ...g, priority: newPriority }
            : g
        )
      );
    }
  }}
>
  <option value="CRITICAL">Critical</option>
  <option value="HIGH">High</option>
  <option value="MEDIUM">Medium</option>
  <option value="LOW">Low</option>
</select>
  
                </div>
  
                <div className="detail-box">
  
                  <span>DEPARTMENT</span>
  
                  <strong>
                    {selectedGrievance.department}
                  </strong>
  
                </div>
  
                <div className="detail-box">
  
                  <span>STATUS</span>
  
                  <strong>
                    {selectedGrievance.status}
                  </strong>
  
                </div>
  
              </div>
  
              <div className="ai-analysis">
  
                <div className="analysis-heading">
  
                  <Brain size={18} />
  
                  <div>
  
                    <h3>AI Analysis</h3>
  
                    <span>
                      Automated classification result
                    </span>
  
                  </div>
  
                </div>
  
                <div className="analysis-confidence">
  
                  <span>
                    Classification confidence
                  </span>
  
                  <strong>
                    {selectedGrievance.confidence}
                  </strong>
  
                </div>
  
              </div>
  
              <div className="detail-description">
  
                <h3>
                  Citizen's Description
                </h3>
  
                <p>
                  {selectedGrievance.description}
                </p>
  
              </div>
  
              <div className="detail-meta">
  
                <div>
                  <MapPin size={15} />
  
                  <span>
                    {selectedGrievance.location}
                  </span>
                </div>
  
                <div>
                  <CalendarDays size={15} />
  
                  <span>
                    {selectedGrievance.date}
                  </span>
                </div>
  
                <div>
                  <Building2 size={15} />
  
                  <span>
                    {selectedGrievance.department}
                  </span>
                </div>
  
              </div>
  
            </div>
  
          </div>
  
        )}
  
      </section>
    );
  }
  
export default Admin;