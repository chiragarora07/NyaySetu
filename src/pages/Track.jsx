import { useState } from "react";
import {
  Search,
  CheckCircle2,
  Brain,
  Building2,
  Clock3,
} from "lucide-react";

function Track() {
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <section className="track-page">
      <div className="track-container">

        <div className="track-header">
          <span className="section-eyebrow">
            CITIZEN SERVICES
          </span>

          <h1>Track your grievance</h1>

          <p>
            Enter your grievance ID to see where your issue
            currently stands.
          </p>
        </div>

        <form className="track-search" onSubmit={handleSearch}>
          <div className="track-input-wrapper">
            <Search size={19} />

            <input
              type="text"
              placeholder="Example: NS-2026-001284"
              required
            />
          </div>

          <button type="submit" className="primary-button">
            Track Grievance
          </button>
        </form>

        {searched && (
          <div className="tracking-result">

            <div className="tracking-summary">

              <div>
                <span className="result-label">
                  GRIEVANCE ID
                </span>

                <strong>NS-2026-001284</strong>
              </div>

              <div className="status-badge">
                <Clock3 size={14} />
                IN PROGRESS
              </div>

            </div>

            <div className="tracking-divider"></div>

            <div className="tracking-details">

              <div className="tracking-detail">
                <span>Category</span>
                <strong>Infrastructure</strong>
              </div>

              <div className="tracking-detail">
                <span>Issue</span>
                <strong>Street Lighting</strong>
              </div>

              <div className="tracking-detail">
                <span>Location</span>
                <strong>Sector 4</strong>
              </div>

              <div className="tracking-detail">
                <span>Priority</span>
                <strong className="high-priority">
                  HIGH
                </strong>
              </div>

            </div>

            <div className="tracking-timeline">

              <div className="timeline-item completed">

                <div className="timeline-icon">
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <strong>Grievance Received</strong>
                  <span>
                    Your grievance has been successfully registered.
                  </span>
                </div>

              </div>

              <div className="timeline-item completed">

                <div className="timeline-icon">
                  <Brain size={18} />
                </div>

                <div>
                  <strong>AI Analysis Completed</strong>
                  <span>
                    The grievance has been classified and prioritized.
                  </span>
                </div>

              </div>

              <div className="timeline-item active">

                <div className="timeline-icon">
                  <Building2 size={18} />
                </div>

                <div>
                  <strong>Sent to Department</strong>
                  <span>
                    Municipal / Electricity Services is reviewing
                    the grievance.
                  </span>
                </div>

              </div>

              <div className="timeline-item">

                <div className="timeline-icon">
                  <Clock3 size={18} />
                </div>

                <div>
                  <strong>Resolution</strong>
                  <span>
                    Awaiting departmental action.
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