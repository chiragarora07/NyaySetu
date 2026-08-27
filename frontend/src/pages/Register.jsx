import { useState } from "react";

import {
  MapPin,
  Paperclip,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { useSite } from "../context/SiteContext";

function Register() {
  const { t, language } = useSite();

  const [submitted, setSubmitted] = useState(false);
  const [citizenName, setCitizenName] = useState("");
  const [citizenMobile, setCitizenMobile] = useState("");
  const [complaintText, setComplaintText] = useState("");
  const [location, setLocation] = useState("");
  const [grievanceId, setGrievanceId] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Translate only fixed AI values.
  // AI-generated text such as summary/reason/category/department
  // is already returned in the user's language by the backend.
  const getPriorityText = (priority) => {
    if (language !== "hi") {
      return priority;
    }

    const priorityMap = {
      Critical: "अत्यंत गंभीर",
      High: "उच्च",
      Medium: "मध्यम",
      Low: "कम",
      critical: "अत्यंत गंभीर",
      high: "उच्च",
      medium: "मध्यम",
      low: "कम",
      "अत्यंत गंभीर": "अत्यंत गंभीर",
      "उच्च": "उच्च",
      "मध्यम": "मध्यम",
      "कम": "कम",
    };

    return priorityMap[priority] || priority;
  };

  const getStatusText = (status) => {
    if (!status) {
      return language === "hi" ? "लंबित" : "Pending";
    }

    if (language !== "hi") {
      return status;
    }

    const statusMap = {
      Pending: "लंबित",
      pending: "लंबित",
      Analyzed: "विश्लेषित",
      analyzed: "विश्लेषित",
      "In Progress": "प्रगति में",
      "in progress": "प्रगति में",
      Resolved: "समाधान हो गया",
      resolved: "समाधान हो गया",
      Assigned: "सौंपा गया",
      assigned: "सौंपा गया",
      "लंबित": "लंबित",
      "विश्लेषित": "विश्लेषित",
      "प्रगति में": "प्रगति में",
      "समाधान हो गया": "समाधान हो गया",
      "सौंपा गया": "सौंपा गया",
    };

    return statusMap[status] || status;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/complaints/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            citizen_name: citizenName,
            citizen_mobile: citizenMobile,
            description: complaintText,
            location: location,
            language: language,
          }),
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || t.submitError);
      }

      setAnalysis(result);
      setGrievanceId(result.complaintId);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(err.message || t.submitError);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SUCCESS SCREEN
  // =========================

  if (submitted) {
    return (
      <section className="success-page">
        <div className="success-card">

          <div className="success-icon">
            <CheckCircle2 size={40} />
          </div>

          <span className="section-eyebrow">
            {language === "hi"
              ? "शिकायत का विश्लेषण पूरा हुआ"
              : "GRIEVANCE ANALYZED"}
          </span>

          <h1>
            {language === "hi"
              ? "आपकी शिकायत का विश्लेषण पूरा हो गया है।"
              : "Your grievance has been analyzed."}
          </h1>

          <p>
            {language === "hi"
              ? "न्यायसेतु ने आपकी शिकायत का विश्लेषण करके उपयुक्त विभाग और प्राथमिकता की पहचान की है।"
              : "NyaySetu has analyzed your complaint and identified the appropriate department and priority."}
          </p>

          <div className="grievance-id">
            <span>{t.grievanceId}</span>
            <strong>{grievanceId}</strong>
          </div>

          {analysis && (
            <div className="analysis-result">

              {/* CATEGORY */}
              <div>
                <span>{t.category}</span>
                <strong>{analysis.category}</strong>
              </div>

              {/* DEPARTMENT */}
              <div>
                <span>{t.department}</span>
                <strong>{analysis.department}</strong>
              </div>

              {/* PRIORITY */}
              <div>
                <span>{t.priority}</span>
                <strong>
                  {getPriorityText(analysis.priority)}
                </strong>
              </div>

              {/* SUMMARY */}
              <div>
                <span>
                  {language === "hi" ? "सारांश" : "Summary"}
                </span>
                <strong>
                  {analysis.summary}
                </strong>
              </div>

              {/* REASON */}
              <div>
                <span>
                  {language === "hi" ? "कारण" : "Reason"}
                </span>
                <strong>
                  {analysis.priorityReason || analysis.reason}
                </strong>
              </div>

              {/* STATUS */}
              <div>
                <span>
                  {language === "hi"
                    ? "विश्लेषण स्थिति"
                    : "Analysis Status"}
                </span>

                <strong>
                  {language === "hi"
                    ? "सफलतापूर्वक विश्लेषण किया गया"
                    : "Analyzed Successfully"}
                </strong>
              </div>

              {/* CURRENT STATUS */}
              {analysis.status && (
                <div>
                  <span>
                    {language === "hi"
                      ? "स्थिति"
                      : "Status"}
                  </span>

                  <strong>
                    {getStatusText(analysis.status)}
                  </strong>
                </div>
              )}

            </div>
          )}

          <a href="/" className="primary-button">
            {t.returnHome}
          </a>

        </div>
      </section>
    );
  }

  // =========================
  // REGISTER FORM
  // =========================

  return (
    <section className="register-page">

      <div className="register-container">

        {/* PAGE HEADER */}
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

        {/* ERROR */}
        {error && (
          <p className="form-error">
            {error}
          </p>
        )}

        <form
          className="grievance-form"
          onSubmit={handleSubmit}
        >

          {/* =========================
              01 - CITIZEN INFORMATION
          ========================= */}

          <div className="form-section">

            <div className="form-section-title">
              <span>01</span>
              {t.citizenInformation}
            </div>

            <div className="form-grid">

              {/* NAME */}
              <div className="form-field">

                <label>
                  {t.name}
                </label>

                <input
                  type="text"
                  placeholder={t.namePlaceholder}
                  required
                  value={citizenName}
                  onChange={(e) =>
                    setCitizenName(e.target.value)
                  }
                />

              </div>

              {/* MOBILE */}
              <div className="form-field">

                <label>
                  {t.phone}
                </label>

                <input
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  required
                  value={citizenMobile}
                  onChange={(e) =>
                    setCitizenMobile(e.target.value)
                  }
                />

              </div>

            </div>
          </div>

          {/* =========================
              02 - GRIEVANCE DETAILS
          ========================= */}

          <div className="form-section">

            <div className="form-section-title">
              <span>02</span>
              {t.grievanceDetails}
            </div>

            {/* COMPLAINT */}
            <div className="form-field">

              <label>
                {t.whatHappened}
              </label>

              <textarea
                rows="6"
                placeholder={t.grievancePlaceholder}
                required
                value={complaintText}
                onChange={(e) =>
                  setComplaintText(e.target.value)
                }
              />

            </div>

            {/* ISSUE TYPE */}
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

          {/* =========================
              03 - LOCATION
          ========================= */}

          <div className="form-section">

            <div className="form-section-title">
              <span>03</span>
              {t.location}
            </div>

            <div className="form-grid">

              {/* CITY */}
              <div className="form-field">

                <label>
                  {t.cityDistrict}
                </label>

                <input
                  type="text"
                  placeholder={t.cityDistrictPlaceholder}
                  required
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                />

              </div>

              {/* LOCALITY */}
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

          {/* =========================
              04 - SUPPORTING EVIDENCE
          ========================= */}

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

          {/* =========================
              SUBMIT
          ========================= */}

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
              disabled={loading}
            >

              {loading
                ? t.submitting
                : t.submit}

              {!loading && (
                <ArrowRight size={18} />
              )}

            </button>

          </div>

        </form>

      </div>

    </section>
  );
}

export default Register;