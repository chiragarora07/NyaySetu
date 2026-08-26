import {
    ShieldCheck,
    Menu,
    X,
  } from "lucide-react";
  
  import { useState } from "react";
  
  import { Link } from "react-router-dom";
  
  function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
  
    return (
      <header className="site-navbar">
  
        <div className="navbar-container">
  
          <Link to="/" className="navbar-brand">
            <div className="brand-symbol">
              <ShieldCheck size={20} />
            </div>
  
            <div className="brand-text">
              <strong>NyaySetu</strong>
              <span>CIVIC GRIEVANCE PLATFORM</span>
            </div>
          </Link>
  
          <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
  
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
  
            <Link
              to="/track"
              onClick={() => setMenuOpen(false)}
            >
              Track Grievance
            </Link>
  
            <a
              href="/#departments"
              onClick={() => setMenuOpen(false)}
            >
              Departments
            </a>
  
          </nav>
  
          <Link
            to="/register"
            className="navbar-action"
          >
            Register Grievance
          </Link>
  
          <button
            className="navbar-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
  
        </div>
  
      </header>
    );
  }
  
export default Navbar;