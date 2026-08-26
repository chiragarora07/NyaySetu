import {
    MessageSquareText,
    Brain,
    AlertTriangle,
    Building2,
    CheckCircle2,
  } from "lucide-react";
  
  const steps = [
    {
      number: "01",
      icon: <MessageSquareText size={21} />,
      title: "You tell us",
      description:
        "Describe your civic issue in your own words.",
    },
    {
      number: "02",
      icon: <Brain size={21} />,
      title: "NyaySetu understands",
      description:
        "AI analyses the grievance and identifies its category.",
    },
    {
      number: "03",
      icon: <AlertTriangle size={21} />,
      title: "Priority is assessed",
      description:
        "The system identifies how urgently the issue needs attention.",
    },
    {
      number: "04",
      icon: <Building2 size={21} />,
      title: "Right department",
      description:
        "The grievance is routed towards the appropriate civic department.",
    },
    {
      number: "05",
      icon: <CheckCircle2 size={21} />,
      title: "Action & resolution",
      description:
        "The department can act while you track the grievance.",
    },
  ];
  
  function HowItWorks() {
    return (
      <section className="how-section" id="how-it-works">
        <div className="how-container">
  
          <div className="how-heading">
            <span className="section-eyebrow">
              THE NYAYSETU PATH
            </span>
  
            <h2>
              One complaint.
              <br />
              A clearer path to action.
            </h2>
  
            <p>
              NyaySetu brings structure to the journey between
              a citizen raising an issue and the administration
              responding to it.
            </p>
          </div>
  
          <div className="how-steps">
  
            {steps.map((step, index) => (
              <div className="how-step" key={step.number}>
  
                <div className="how-step-number">
                  {step.number}
                </div>
  
                <div className="how-step-icon">
                  {step.icon}
                </div>
  
                <h3>{step.title}</h3>
  
                <p>{step.description}</p>
  
                {index < steps.length - 1 && (
                  <div className="how-line" />
                )}
  
              </div>
            ))}
  
          </div>
  
        </div>
      </section>
    );
  }
  
export default HowItWorks;