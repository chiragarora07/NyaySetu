import {
    FilePlus2,
    Search,
    Building2,
    Info,
  } from "lucide-react";
  
  import ServiceCard from "./ServiceCard";
  
  function ServicesSection() {
    return (
      <section className="services-section">
        <div className="services-container">
  
          <div className="section-heading services-heading">
            <span className="section-eyebrow">
              PUBLIC SERVICES
            </span>
  
            <h2>
              How can we help?
            </h2>
  
            <p>
              Start a grievance, follow its progress, or understand
              how NyaySetu connects your issue with the right service.
            </p>
          </div>
  
          <div className="services-grid">
  
            <ServiceCard
              number="01"
              icon={<FilePlus2 size={23} />}
              title="Register a Grievance"
              description="Tell us what needs attention in your community."
              href="/register"
            />
  
            <ServiceCard
              number="02"
              icon={<Search size={23} />}
              title="Track a Grievance"
              description="Check the current status of an existing grievance."
              href="/track"
            />
  
            <ServiceCard
              number="03"
              icon={<Building2 size={23} />}
              title="Civic Departments"
              description="Explore the public services connected to NyaySetu."
              href="#departments"
            />
  
            <ServiceCard
              number="04"
              icon={<Info size={23} />}
              title="How NyaySetu Works"
              description="Understand how your grievance moves from report to action."
              href="#how-it-works"
            />
  
          </div>
  
        </div>
      </section>
    );
  }
  
export default ServicesSection;