import { useState } from "react";
import {
  MapPin,
  Paperclip,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function Register() {
  const [submitted, setSubmitted] = useState(false);

  const [complaintText, setComplaintText] = useState("");
const [analysis, setAnalysis] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const response = await fetch(
      "http://localhost:5000/api/complaints/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: complaintText
        })
      }
    );

    if (!response.ok) {
      throw new Error("AI analysis failed");
    }

    const result = await response.json();

    setAnalysis(result);
    setSubmitted(true);
  } catch (err) {
    console.error(err);
    setError("Unable to analyze your grievance. Please try again.");
  } finally {
    setLoading(false);
  }
};

  if (submitted) {
    return (
      <section className="success-page">
        <div className="success-card">
          <div className="success-icon">
            <CheckCircle2 size={40} />
          </div>

          <span className="section-eyebrow">
            GRIEVANCE RECEIVED
          </span>

          <h1>Your grievance is on its way.</h1>

          <p>
            NyaySetu has received your grievance. It can now
            move through analysis and departmental routing.
          </p>

          <div className="grievance-id">
            <span>GRIEVANCE ID</span>
            <strong>NS-2026-001284</strong>
          </div>

          <a href="/" className="primary-button">
            Return to Home
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="register-page">
      <div className="register-container">

        <div className="register-header">
          <span className="section-eyebrow">
            CITIZEN SERVICES
          </span>

          <h1>Register a Grievance</h1>

          <p>
            Tell us what happened. You don't need to know
            which department should handle it — NyaySetu
            helps identify the right path.
          </p>
        </div>

        <form className="grievance-form" onSubmit={handleSubmit}>

          <div className="form-section">
            <div className="form-section-title">
              <span>01</span>
              Citizen Information
            </div>

            <div className="form-grid">

              <div className="form-field">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-field">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  required
                />
              </div>

            </div>
          </div>

          <div className="form-section">

            <div className="form-section-title">
              <span>02</span>
              Grievance Details
            </div>

            <div className="form-field">
              <label>What happened?</label>

              <textarea
  rows="6"
  placeholder="Describe your issue in your own words..."
  required
  value={complaintText}
  onChange={(e) => setComplaintText(e.target.value)}
/>
            </div>

            <div className="form-field">

              <label>What kind of issue is this?</label>

              <select required defaultValue="">
                <option value="" disabled>
                  Select if you know
                </option>

                <option>Roads & Infrastructure</option>
                <option>Water Supply</option>
                <option>Electricity</option>
                <option>Sanitation</option>
                <option>Public Safety</option>
                <option>Other</option>
              </select>

              <small>
                Not sure? Leave the classification to NyaySetu.
              </small>

            </div>

          </div>

          <div className="form-section">

            <div className="form-section-title">
              <span>03</span>
              Location
            </div>

            <div className="form-grid">

              <div className="form-field">
                <label>City / District</label>
                <input
                  type="text"
                  placeholder="Enter city or district"
                  required
                />
              </div>

              <div className="form-field">
                <label>Area / Locality</label>
                <input
                  type="text"
                  placeholder="Enter locality"
                />
              </div>

            </div>

            <button
              type="button"
              className="location-button"
            >
              <MapPin size={17} />
              Use current location
            </button>

          </div>

          <div className="form-section">

            <div className="form-section-title">
              <span>04</span>
              Supporting Evidence
            </div>

            <label className="upload-box">

              <Paperclip size={22} />

              <div>
                <strong>Attach a photo or document</strong>
                <span>
                  PNG, JPG or PDF · Optional
                </span>
              </div>

              <input type="file" />

            </label>

          </div>

          <div className="form-submit">

            <div>
              <strong>Ready to submit?</strong>

              <span>
                Your grievance will be securely recorded.
              </span>
            </div>

            <button type="submit" className="primary-button">
              Submit Grievance
              <ArrowRight size={18} />
            </button>

          </div>

        </form>

      </div>
    </section>
  );
}

export default Register;