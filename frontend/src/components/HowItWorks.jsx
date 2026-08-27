import {
  MessageSquareText,
  Brain,
  AlertTriangle,
  Building2,
  CheckCircle2,
} from "lucide-react";

import { useSite } from "../context/SiteContext";

function HowItWorks() {
  const { t } = useSite();

  const steps = [
    {
      number: "01",
      icon: <MessageSquareText size={21} />,
      title: t.stepOneTitle,
      description: t.stepOneDescription,
    },
    {
      number: "02",
      icon: <Brain size={21} />,
      title: t.stepTwoTitle,
      description: t.stepTwoDescription,
    },
    {
      number: "03",
      icon: <AlertTriangle size={21} />,
      title: t.stepThreeTitle,
      description: t.stepThreeDescription,
    },
    {
      number: "04",
      icon: <Building2 size={21} />,
      title: t.stepFourTitle,
      description: t.stepFourDescription,
    },
    {
      number: "05",
      icon: <CheckCircle2 size={21} />,
      title: t.stepFiveTitle,
      description: t.stepFiveDescription,
    },
  ];

  return (
    <section
      className="how-section"
      id="how-it-works"
    >
      <div className="how-container">

        <div className="how-heading">

          <span className="section-eyebrow">
            {t.nyaysetuPath}
          </span>

          <h2>
            {t.oneComplaint}
            <br />
            {t.clearerPath}
          </h2>

          <p>
            {t.howItWorksDescription}
          </p>

        </div>

        <div className="how-steps">

          {steps.map((step, index) => (

            <div
              className="how-step"
              key={step.number}
            >

              <div className="how-step-number">
                {step.number}
              </div>

              <div className="how-step-icon">
                {step.icon}
              </div>

              <h3>
                {step.title}
              </h3>

              <p>
                {step.description}
              </p>

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