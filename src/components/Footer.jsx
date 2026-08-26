import {
    ShieldCheck,
    ExternalLink,
  } from "lucide-react";
  
  import { Link } from "react-router-dom";
  
  function Footer() {
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
                  A citizen-first civic grievance platform
                  designed to connect concerns with action.
                </p>
              </div>
  
            </div>
  
            {/* LINKS */}
  
            <div className="footer-links">
  
              <div>
                <span>QUICK ACCESS</span>
  
                <Link to="/register">
                  Register Grievance
                </Link>
  
                <Link to="/track">
                  Track Grievance
                </Link>
              </div>
  
              <div>
                <span>EXPLORE</span>
  
                <a href="/#departments">
                  Departments
                </a>
  
                <a href="/#how-it-works">
                  How NyaySetu Works
                </a>
              </div>
  
              <div>
                <span>ADMINISTRATION</span>
  
                <Link to="/admin">
                  Administration Portal
                </Link>
              </div>
  
            </div>
  
          </div>
  
          {/* BOTTOM */}
  
          <div className="footer-bottom">
  
            <span>
              © 2026 NyaySetu · Prototype for civic innovation
            </span>
  
            <span className="footer-note">
              Built for better public service
              <ExternalLink size={12} />
            </span>
  
          </div>
  
        </div>
  
      </footer>
    );
  }
  
export default Footer;