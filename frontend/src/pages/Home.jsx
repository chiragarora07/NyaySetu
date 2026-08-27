import { Link } from "react-router-dom";

import DepartmentsSection from "../components/DepartmentsSection";
import HowItWorks from "../components/HowItWorks";
import ServicesSection from "../components/ServicesSection";
import JourneySection from "../components/JourneySection";

import {
  ArrowRight,
  Search,
  ShieldCheck,
  Sparkles,
  Building2,
} from "lucide-react";

import { useSite } from "../context/SiteContext";

function Home() {
  const { t } = useSite();


  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">

        <div className="hero-background">
          <div className="hero-grid"></div>
          <div className="hero-orb hero-orb-one"></div>
          <div className="hero-orb hero-orb-two"></div>
        </div>

        <div className="hero-container">

          <div className="hero-content">

            <div className="hero-eyebrow">
              <span className="eyebrow-dot"></span>

              {t.heroEyebrow}
            </div>

            <h1>
              {t.heroTitle}
            </h1>

            <p className="hero-description">
              {t.heroDescription}
            </p>

            <div className="hero-actions">

              <Link
                to="/register"
                className="primary-button"
              >
                {t.heroRegister}
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/track"
                className="secondary-button"
              >
                <Search size={18} />
                {t.heroTrack}
              </Link>

            </div>

            <div className="hero-trust">

              <div>
                <ShieldCheck size={17} />
                {t.aiAssisted}
              </div>

              <div>
                <Sparkles size={17} />
                {t.smartRouting}
              </div>

              <div>
                <Building2 size={17} />
                {t.departmentAware}
              </div>

            </div>

          </div>

          {/* JOURNEY VISUAL */}

          <div className="hero-visual">

            <div className="journey-label">
              {t.journeyLabel}
            </div>

            <div className="journey">

              <div className="journey-node citizen">

                <div className="node-number">01</div>

                <div>
                  <strong>{t.citizen}</strong>
                  <span>{t.reportsIssue}</span>
                </div>

              </div>

              <div className="journey-line"></div>

              <div className="journey-node ai-node">

                <div className="node-number">02</div>

                <div>
                  <strong>{t.aiUnderstanding}</strong>
                  <span>{t.analyzesGrievance}</span>
                </div>

              </div>

              <div className="journey-line"></div>

              <div className="journey-node department">

                <div className="node-number">03</div>

                <div>
                  <strong>{t.rightDepartment}</strong>
                  <span>{t.receivesGrievance}</span>
                </div>

              </div>

              <div className="journey-line"></div>

              <div className="journey-node resolution">

                <div className="node-number">04</div>

                <div>
                  <strong>{t.resolution}</strong>
                  <span>{t.actionBegins}</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* SERVICES */}
      <ServicesSection />

      {/* DEPARTMENTS */}
      <DepartmentsSection />

      {/* HOW IT WORKS */}
      <HowItWorks />

    </div>
  );
}

export default Home;