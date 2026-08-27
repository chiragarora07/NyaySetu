import {
  FilePlus2,
  Search,
  Building2,
  Info,
} from "lucide-react";

import ServiceCard from "./ServiceCard";
import { useSite } from "../context/SiteContext";

function ServicesSection() {
  const { t } = useSite();

  return (
    <section className="services-section">
      <div className="services-container">

        <div className="section-heading services-heading">

          <span className="section-eyebrow">
            {t.publicServices}
          </span>

          <h2>
            {t.servicesTitle}
          </h2>

          <p>
            {t.servicesDescription}
          </p>

        </div>

        <div className="services-grid">

          <ServiceCard
            number="01"
            icon={<FilePlus2 size={23} />}
            title={t.registerTitle}
            description={t.registerDescription}
            href="/register"
          />

          <ServiceCard
            number="02"
            icon={<Search size={23} />}
            title={t.trackTitle}
            description={t.trackDescription}
            href="/track"
          />

          <ServiceCard
            number="03"
            icon={<Building2 size={23} />}
            title={t.civicDepartments}
            description={t.civicDepartmentsDescription}
            href="#departments"
          />

          <ServiceCard
            number="04"
            icon={<Info size={23} />}
            title={t.howItWorks}
            description={t.howItWorksDescription}
            href="#how-it-works"
          />

        </div>

      </div>
    </section>
  );
}

export default ServicesSection;