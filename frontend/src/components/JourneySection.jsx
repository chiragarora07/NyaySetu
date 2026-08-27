import {
    FileText,
    Brain,
    AlertTriangle,
    Building2,
    CheckCircle2,
  } from "lucide-react";
  
  function JourneySection() {
    return (
      <section className="journey-section">
        <div className="journey-section-container">
  
          <div className="section-heading">
            <span className="section-eyebrow">
              FROM WORDS TO ACTION
            </span>
  
            <h2>
              Where does your grievance go?
            </h2>
  
            <p>
              You describe the problem in your own words.
              NyaySetu helps turn it into structured information
              that can reach the right department.
            </p>
          </div>
  
          <div className="grievance-example">
  
            {/* ORIGINAL GRIEVANCE */}
  
            <div className="journey-card original-card">
  
              <div className="journey-card-top">
                <div className="journey-icon">
                  <FileText size={20} />
                </div>
  
                <span>01 · YOUR GRIEVANCE</span>
              </div>
  
              <h3>
                Streetlight near Sector 4 has not
                worked for two weeks.
              </h3>
  
              <div className="location-text">
                Sector 4 · Reported by citizen
              </div>
  
            </div>
  
            <div className="journey-connector">
              <span></span>
            </div>
  
            {/* AI UNDERSTANDING */}
  
            <div className="journey-card">
  
              <div className="journey-card-top">
                <div className="journey-icon ai-icon">
                  <Brain size={20} />
                </div>
  
                <span>02 · AI UNDERSTANDS</span>
              </div>
  
              <div className="analysis-row">
                <span>Category</span>
                <strong>Infrastructure</strong>
              </div>
  
              <div className="analysis-row">
                <span>Issue</span>
                <strong>Street Lighting</strong>
              </div>
  
              <div className="analysis-row">
                <span>Location</span>
                <strong>Sector 4</strong>
              </div>
  
            </div>
  
            <div className="journey-connector">
              <span></span>
            </div>
  
            {/* PRIORITY */}
  
            <div className="journey-card priority-card">
  
              <div className="journey-card-top">
                <div className="journey-icon priority-icon">
                  <AlertTriangle size={20} />
                </div>
  
                <span>03 · PRIORITY</span>
              </div>
  
              <div className="priority-value">
                HIGH
              </div>
  
              <p>
                Extended outage may create a
                public safety concern.
              </p>
  
            </div>
  
            <div className="journey-connector">
              <span></span>
            </div>
  
            {/* DEPARTMENT */}
  
            <div className="journey-card">
  
              <div className="journey-card-top">
                <div className="journey-icon department-icon">
                  <Building2 size={20} />
                </div>
  
                <span>04 · ROUTED TO</span>
              </div>
  
              <h3>
                Electricity /
                Municipal Services
              </h3>
  
              <p>
                Suggested department based on
                grievance classification.
              </p>
  
            </div>
  
            <div className="journey-connector">
              <span></span>
            </div>
  
            {/* RESOLUTION */}
  
            <div className="journey-card resolution-card">
  
              <div className="journey-card-top">
                <div className="journey-icon resolution-icon">
                  <CheckCircle2 size={20} />
                </div>
  
                <span>05 · NEXT STEP</span>
              </div>
  
              <h3>
                Awaiting Department Action
              </h3>
  
              <p>
                The grievance is now ready for
                departmental processing.
              </p>
  
            </div>
  
          </div>
  
        </div>
      </section>
    );
  }
  
export default JourneySection;