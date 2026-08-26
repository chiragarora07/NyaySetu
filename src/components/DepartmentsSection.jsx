import {
    Droplets,
    Zap,
    Construction,
    Trash2,
    Shield,
    HeartPulse,
  } from "lucide-react";
  
  const departments = [
    {
      icon: <Construction size={21} />,
      name: "Public Works",
      description: "Roads, streets, drainage and public infrastructure",
    },
    {
      icon: <Droplets size={21} />,
      name: "Water Services",
      description: "Water supply, leakage and related civic issues",
    },
    {
      icon: <Zap size={21} />,
      name: "Electricity",
      description: "Streetlights, power supply and electrical issues",
    },
    {
      icon: <Trash2 size={21} />,
      name: "Sanitation",
      description: "Waste collection, cleanliness and sanitation",
    },
    {
      icon: <Shield size={21} />,
      name: "Public Safety",
      description: "Safety concerns and urgent civic issues",
    },
    {
      icon: <HeartPulse size={21} />,
      name: "Health Services",
      description: "Public health and community health concerns",
    },
  ];
  
  function DepartmentsSection() {
    return (
      <section className="departments-section" id="departments">
        <div className="departments-container">
  
          <div className="section-heading">
            <span className="section-eyebrow">
              CIVIC SERVICES
            </span>
  
            <h2>Who handles your grievance?</h2>
  
            <p>
              You don't need to figure out the right department.
              NyaySetu helps classify your grievance and identify
              where it should go.
            </p>
          </div>
  
          <div className="departments-grid">
  
            {departments.map((department, index) => (
              <div className="department-card" key={department.name}>
  
                <div className="department-card-top">
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>
  
                  <div className="department-icon-box">
                    {department.icon}
                  </div>
                </div>
  
                <h3>{department.name}</h3>
  
                <p>{department.description}</p>
  
              </div>
            ))}
  
          </div>
  
        </div>
      </section>
    );
  }
  
export default DepartmentsSection;