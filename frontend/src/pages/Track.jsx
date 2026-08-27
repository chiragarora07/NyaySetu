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

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
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
            />

          </div>

          <button
            type="submit"
            className="primary-button"
          >
            {t.trackGrievance}
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
                  NS-2026-001284
                </strong>

              </div>

              <div className="status-badge">

                <Clock3 size={14} />

                {t.inProgress}
                
              </div>

            </div>

            <div className="tracking-divider"></div>

            {/* DETAILS */}

            <div className="tracking-details">

              <div className="tracking-detail">
                <span>{t.category}</span>
                <strong>{t.infrastructure}</strong>
              </div>

              <div className="tracking-detail">
                <span>{t.issue}</span>
                <strong>{t.streetLighting}</strong>
              </div>

              <div className="tracking-detail">
                <span>{t.location}</span>
                <strong>{t.sector4}</strong>
              </div>

              <div className="tracking-detail">
                <span>{t.priority}</span>

                <strong className="high-priority">
                  {t.high}
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

              <div className="timeline-item completed">

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

              <div className="timeline-item active">

                <div className="timeline-icon">
                  <Building2 size={18} />
                </div>

                <div>

                  <strong>
                    {t.sentToDepartment}
                  </strong>

                  <span>
                    {t.departmentReview}
                  </span>

                </div>

              </div>

              {/* RESOLUTION */}

              <div className="timeline-item">

                <div className="timeline-icon">
                  <Clock3 size={18} />
                </div>

                <div>

                  <strong>
                    {t.resolution}
                  </strong>

                  <span>
                    {t.awaitingAction}
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