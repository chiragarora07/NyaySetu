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
  
  import { useState } from "react";
  
  function Admin() {
    const [selectedGrievance, setSelectedGrievance] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");
  
    const grievances = [
      {
        id: "NS-001284",
        title: "Streetlight outage",
        category: "Infrastructure",
        priority: "HIGH",
        department: "Municipal Services",
        status: "In Progress",
        location: "Sector 4",
        date: "26 August 2026",
        description:
          "Streetlights in Sector 4 have not been functioning for the past three nights, creating visibility and safety concerns for residents.",
        confidence: "94%",
      },
      {
        id: "NS-001283",
        title: "Water supply disruption",
        category: "Water Services",
        priority: "MEDIUM",
        department: "Water Department",
        status: "Assigned",
        location: "Ward 12",
        date: "26 August 2026",
        description:
          "Residents have reported an interruption in regular water supply in the area.",
        confidence: "91%",
      },
      {
        id: "NS-001282",
        title: "Damaged road near market",
        category: "Infrastructure",
        priority: "HIGH",
        department: "Public Works",
        status: "In Progress",
        location: "Central Market Road",
        date: "25 August 2026",
        description:
          "A damaged section of road near the market is affecting vehicles and pedestrians.",
        confidence: "96%",
      },
      {
        id: "NS-001281",
        title: "Garbage collection issue",
        category: "Sanitation",
        priority: "LOW",
        department: "Sanitation",
        status: "Resolved",
        location: "Ward 8",
        date: "24 August 2026",
        description:
          "Garbage collection was missed in the locality and residents reported accumulated waste.",
        confidence: "89%",
      },
    ];
  
    const filteredGrievances = grievances.filter((grievance) => {
      const matchesSearch =
        grievance.id
          .toLowerCase()
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
  
                  <strong>1,284</strong>
  
                  <small>
                    +12% this week
                  </small>
  
                </div>
  
                <div className="admin-stat">
  
                  <div className="stat-icon priority-stat">
                    <AlertTriangle size={18} />
                  </div>
  
                  <span>High Priority</span>
  
                  <strong>147</strong>
  
                  <small>
                    Requires attention
                  </small>
  
                </div>
  
                <div className="admin-stat">
  
                  <div className="stat-icon pending-stat">
                    <Clock3 size={18} />
                  </div>
  
                  <span>In Progress</span>
  
                  <strong>392</strong>
  
                  <small>
                    Across departments
                  </small>
  
                </div>
  
                <div className="admin-stat">
  
                  <div className="stat-icon resolved-stat">
                    <CheckCircle2 size={18} />
                  </div>
  
                  <span>Resolved</span>
  
                  <strong>745</strong>
  
                  <small>
                    58% resolution rate
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
  
                  <strong>
                    {selectedGrievance.category}
                  </strong>
  
                </div>
  
                <div className="detail-box">
  
                  <span>PRIORITY</span>
  
                  <strong className="detail-priority">
                    {selectedGrievance.priority}
                  </strong>
  
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