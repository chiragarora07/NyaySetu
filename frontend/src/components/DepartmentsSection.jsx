import {
  Droplets,
  Zap,
  Construction,
  Trash2,
  Shield,
  HeartPulse,
} from "lucide-react";

import { useSite } from "../context/SiteContext";

function DepartmentsSection() {
  const { t } = useSite();

  const departments = [
    {
      icon: <Construction size={21} />,
      name: t.publicWorks,
      description: t.publicWorksDescription,
    },
    {
      icon: <Droplets size={21} />,
      name: t.waterServices,
      description: t.waterServicesDescription,
    },
    {
      icon: <Zap size={21} />,
      name: t.electricity,
      description: t.electricityDescription,
    },
    {
      icon: <Trash2 size={21} />,
      name: t.sanitation,
      description: t.sanitationDescription,
    },
    {
      icon: <Shield size={21} />,
      name: t.publicSafety,
      description: t.publicSafetyDescription,
    },
    {
      icon: <HeartPulse size={21} />,
      name: t.healthServices,
      description: t.healthServicesDescription,
    },
  ];

  return (
    <section
      className="departments-section"
      id="departments"
    >
      <div className="departments-container">

        <div className="section-heading">

          <span className="section-eyebrow">
            {t.civicServices}
          </span>

          <h2>
            {t.departmentQuestion}
          </h2>

          <p>
            {t.departmentDescription}
          </p>

        </div>

        <div className="departments-grid">

          {departments.map((department, index) => (
            <div
              className="department-card"
              key={department.name}
            >

              <div className="department-card-top">

                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="department-icon-box">
                  {department.icon}
                </div>

              </div>

              <h3>
                {department.name}
              </h3>

              <p>
                {department.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default DepartmentsSection;