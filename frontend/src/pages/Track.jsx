import { useState } from "react";

import {
  Search,
  CheckCircle2,
  Brain,
  Building2,
  Clock3,
} from "lucide-react";

import { useSite } from "../context/SiteContext";

function Track() {
  const { t } = useSite();

  const [searched, setSearched] = useState(false);
const [grievanceId, setGrievanceId] = useState("");
const [complaint, setComplaint] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [department, setDepartment] = useState(null);
  const handleSearch = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    setError("");
    setComplaint(null);
    setSearched(false);
  
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/complaints/${grievanceId.trim()}`
      );
  
      if (!response.ok) {
        throw new Error("Grievance not found");
      }
  
      const data = await response.json();

      setComplaint(data);
      
      if (data.department_id) {
        const departmentResponse = await fetch(
          "http://127.0.0.1:8004/api/departments"
        );
      
        if (departmentResponse.ok) {
          const departments = await departmentResponse.json();
      
          const matchedDepartment = departments.find(
            (dept) => dept.id === data.department_id
          );
      
          setDepartment(matchedDepartment || null);
        }
      }
      
      setSearched(true);
    } catch (err) {
      console.error(err);
      setError("Grievance not found. Please check the grievance ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="track-page">
      <div className="track-container">

        {/* HEADER */}

        <div className="track-header">

          <span className="section-eyebrow">
            {t.citizenServices}
          </span>

          <h1>
            {t.trackPageTitle}
          </h1>

          <p>
            {t.trackPageDescription}
          </p>

        </div>

        {/* SEARCH */}
        {error && (
  <p className="form-error">
    {error}
  </p>
)}
        <form
          className="track-search"
          onSubmit={handleSearch}
        >

          <div className="track-input-wrapper">

            <Search size={19} />

            <input
  type="text"
  placeholder={t.grievanceIdPlaceholder}
  required
  value={grievanceId}
  onChange={(e) => setGrievanceId(e.target.value)}
/>

          </div>

          <button
  type="submit"
  className="primary-button"
  disabled={loading}
>
  {loading ? "Searching..." : t.trackGrievance}
</button>

        </form>

        {/* RESULT */}

        {searched && (
          <div className="tracking-result">

            <div className="tracking-summary">

              <div>

                <span className="result-label">
                  {t.grievanceId}
                </span>

                <strong>
  {complaint && `NS-${String(complaint.id).padStart(6, "0")}`}
</strong>

              </div>

              <div className="status-badge">
  <Clock3 size={14} />
  {complaint?.status || "Pending"}
</div>

            </div>

            <div className="tracking-divider"></div>

            {/* DETAILS */}

            <div className="tracking-details">

              <div className="tracking-detail">
                <span>{t.category}</span>
                <strong>{complaint?.category || "Not specified"}</strong>
              </div>

              <div className="tracking-detail">
                <span>{t.issue}</span>
                <strong>{complaint?.description || "Not specified"}</strong>
              </div>

              <div className="tracking-detail">
                <span>{t.location}</span>
                <strong>{complaint?.location || "Not specified"}</strong>
              </div>

              <div className="tracking-detail">
                <span>{t.priority}</span>

                <strong className="high-priority">
  {complaint?.priority || "Not specified"}
</strong>

              </div>

            </div>

            {/* TIMELINE */}

            <div className="tracking-timeline">

              {/* RECEIVED */}

              <div className="timeline-item completed">

                <div className="timeline-icon">
                  <CheckCircle2 size={18} />
                </div>

                <div>

                  <strong>
                    {t.grievanceReceivedTitle}
                  </strong>

                  <span>
                    {t.grievanceReceivedStatus}
                  </span>

                </div>

              </div>

              {/* AI ANALYSIS */}

              <div
  className={`timeline-item ${
    complaint?.ai_summary || complaint?.ai_analysis
      ? "completed"
      : ""
  }`}
>

                <div className="timeline-icon">
                  <Brain size={18} />
                </div>

                <div>

                  <strong>
                    {t.aiAnalysisCompleted}
                  </strong>

                  <span>
                    {t.aiAnalysisDescription}
                  </span>

                </div>

              </div>

              {/* DEPARTMENT */}

              <div
  className={`timeline-item ${
    complaint?.status === "Resolved" || complaint?.status === "Rejected"
      ? "completed"
      : complaint?.department_id
      ? "active"
      : ""
  }`}
>

                <div className="timeline-icon">
                  <Building2 size={18} />
                </div>

                <div>

                <strong>
  {t.sentToDepartment}
</strong>

<span>
  {department?.name || "Department not assigned yet"}
</span>

                </div>

              </div>

              {/* RESOLUTION */}

              <div
  className={`timeline-item ${
    complaint?.status === "Resolved" ? "completed" : ""
  }`}
>

                <div className="timeline-icon">
                  <Clock3 size={18} />
                </div>

                <div>

                <strong>
  {t.resolution}
</strong>

<span>
  {complaint?.status === "Resolved"
    ? "Your grievance has been resolved."
    : complaint?.status === "Rejected"
    ? "Your grievance has been rejected."
    : "Awaiting departmental action."}
</span>

                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default Track;