import {
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useSite } from "../context/SiteContext";

function Footer() {
  const { t } = useSite();

  return (
    <footer className="site-footer">
      <div className="footer-container">

        <div className="footer-main">

          {/* BRAND */}

          <div className="footer-brand">

            <div className="footer-logo">
              <ShieldCheck size={20} />
            </div>

            <div>
              <strong>NyaySetu</strong>

              <p>
                {t.footerDescription}
              </p>
            </div>

          </div>

          {/* LINKS */}

          <div className="footer-links">

            <div>

              <span>
                {t.quickAccess}
              </span>

              <Link to="/register">
                {t.footerRegister}
              </Link>

              <Link to="/track">
                {t.footerTrack}
              </Link>

            </div>

            <div>

              <span>
                {t.explore}
              </span>

              <a href="/#departments">
                {t.footerDepartments}
              </a>

              <a href="/#how-it-works">
                {t.footerHowItWorks}
              </a>

            </div>

            <div>

              <span>
                {t.administrationLabel}
              </span>

              <Link to="/admin">
                {t.administration}
              </Link>

            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="footer-bottom">

          <span>
            {t.footerBottom}
          </span>

          <span className="footer-note">
            {t.footerNote}
            <ExternalLink size={12} />
          </span>

        </div>

      </div>
    </footer>
  );
}

export default Footer;