import { useState } from "react";

import {
  MapPin,
  Paperclip,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { useSite } from "../context/SiteContext";

function Register() {
  const { t } = useSite();

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
            {t.grievanceReceived}
          </span>

          <h1>
            {t.grievanceOnItsWay}
          </h1>

          <p>
            {t.grievanceReceivedDescription}
          </p>

          <div className="grievance-id">
            <span>{t.grievanceId}</span>
            <strong>NS-2026-001284</strong>
          </div>

          <a
            href="/"
            className="primary-button"
          >
            {t.returnHome}
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
            {t.citizenServices}
          </span>

          <h1>
            {t.registerPageTitle}
          </h1>

          <p>
            {t.registerPageDescription}
          </p>

        </div>

        <form
          className="grievance-form"
          onSubmit={handleSubmit}
        >

          {/* 01 - CITIZEN INFORMATION */}

          <div className="form-section">

            <div className="form-section-title">
              <span>01</span>
              {t.citizenInformation}
            </div>

            <div className="form-grid">

              <div className="form-field">

                <label>
                  {t.name}
                </label>

                <input
                  type="text"
                  placeholder={t.namePlaceholder}
                  required
                />

              </div>

              <div className="form-field">

                <label>
                  {t.phone}
                </label>

                <input
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  required
                />

              </div>

            </div>
          </div>

          {/* 02 - GRIEVANCE DETAILS */}

          <div className="form-section">

            <div className="form-section-title">
              <span>02</span>
              {t.grievanceDetails}
            </div>

            <div className="form-field">

              <label>
                {t.whatHappened}
              </label>

              <textarea
                rows="6"
                placeholder={t.grievancePlaceholder}
                required
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
              />
            </div>

            <div className="form-field">

              <label>
                {t.issueType}
              </label>

              <select
                required
                defaultValue=""
              >

                <option
                  value=""
                  disabled
                >
                  {t.selectIfKnown}
                </option>

                <option>
                  {t.roadsInfrastructure}
                </option>

                <option>
                  {t.waterSupply}
                </option>

                <option>
                  {t.electricity}
                </option>

                <option>
                  {t.sanitation}
                </option>

                <option>
                  {t.publicSafety}
                </option>

                <option>
                  {t.other}
                </option>

              </select>

              <small>
                {t.classificationNote}
              </small>

            </div>

          </div>

          {/* 03 - LOCATION */}

          <div className="form-section">

            <div className="form-section-title">
              <span>03</span>
              {t.location}
            </div>

            <div className="form-grid">

              <div className="form-field">

                <label>
                  {t.cityDistrict}
                </label>

                <input
                  type="text"
                  placeholder={t.cityDistrictPlaceholder}
                  required
                />

              </div>

              <div className="form-field">

                <label>
                  {t.areaLocality}
                </label>

                <input
                  type="text"
                  placeholder={t.areaLocalityPlaceholder}
                />

              </div>

            </div>

            <button
              type="button"
              className="location-button"
            >
              <MapPin size={17} />
              {t.useCurrentLocation}
            </button>

          </div>

          {/* 04 - SUPPORTING EVIDENCE */}

          <div className="form-section">

            <div className="form-section-title">
              <span>04</span>
              {t.supportingEvidence}
            </div>

            <label className="upload-box">

              <Paperclip size={22} />

              <div>

                <strong>
                  {t.attachDocument}
                </strong>

                <span>
                  {t.fileTypes}
                </span>

              </div>

              <input type="file" />

            </label>

          </div>

          {/* SUBMIT */}

          <div className="form-submit">

            <div>

              <strong>
                {t.readyToSubmit}
              </strong>

              <span>
                {t.securelyRecorded}
              </span>

            </div>

            <button
              type="submit"
              className="primary-button"
            >
              {t.submit}
              <ArrowRight size={18} />
            </button>

          </div>

        </form>

      </div>
    </section>
  );
}

export default Register;