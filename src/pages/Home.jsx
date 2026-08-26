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
  
  function Home() {
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
                AI-ASSISTED CIVIC GRIEVANCE PLATFORM
              </div>
  
              <h1>
                Every grievance
                <span> deserves a path </span>
                to resolution.
              </h1>
  
              <p className="hero-description">
                NyaySetu connects citizens with the right
                public-service department through intelligent
                grievance understanding, prioritization and routing.
              </p>
  
              <div className="hero-actions">
  
                <a
                  href="/register"
                  className="primary-button"
                >
                  Register a Grievance
                  <ArrowRight size={18} />
                </a>
  
                <a
                  href="/track"
                  className="secondary-button"
                >
                  <Search size={18} />
                  Track Grievance
                </a>
  
              </div>
  
              <div className="hero-trust">
  
                <div>
                  <ShieldCheck size={17} />
                  AI-assisted
                </div>
  
                <div>
                  <Sparkles size={17} />
                  Smart routing
                </div>
  
                <div>
                  <Building2 size={17} />
                  Department-aware
                </div>
  
              </div>
  
            </div>
  
            {/* JOURNEY VISUAL */}
  
            <div className="hero-visual">
  
              <div className="journey-label">
                THE NYAYSETU JOURNEY
              </div>
  
              <div className="journey">
  
                <div className="journey-node citizen">
                  <div className="node-number">01</div>
  
                  <div>
                    <strong>Citizen</strong>
                    <span>Reports an issue</span>
                  </div>
                </div>
  
                <div className="journey-line"></div>
  
                <div className="journey-node ai-node">
                  <div className="node-number">02</div>
  
                  <div>
                    <strong>AI Understanding</strong>
                    <span>Analyzes the grievance</span>
                  </div>
                </div>
  
                <div className="journey-line"></div>
  
                <div className="journey-node department">
                  <div className="node-number">03</div>
  
                  <div>
                    <strong>Right Department</strong>
                    <span>Receives the grievance</span>
                  </div>
                </div>
  
                <div className="journey-line"></div>
  
                <div className="journey-node resolution">
                  <div className="node-number">04</div>
  
                  <div>
                    <strong>Resolution</strong>
                    <span>Action begins</span>
                  </div>
                </div>
  
              </div>
  
            </div>
  
          </div>
        </section>

        <ServicesSection />

        <DepartmentsSection />

        <HowItWorks />

  
      </div>
    );
  }
  
export default Home;