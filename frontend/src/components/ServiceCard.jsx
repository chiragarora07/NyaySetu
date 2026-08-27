function ServiceCard({ icon, number, title, description, href }) {
    return (
      <a href={href} className="service-card">
        <div className="service-card-top">
          <span className="service-number">{number}</span>
  
          <div className="service-icon">
            {icon}
          </div>
        </div>
  
        <div className="service-card-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
  
        <div className="service-card-arrow">
          →
        </div>
      </a>
    );
  }
  
export default ServiceCard;