import {
  ShieldCheck,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSite } from "../context/SiteContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    language,
    toggleLanguage,
    darkMode,
    toggleTheme,
    t,
  } = useSite();

  return (
    <header className="site-navbar">

      <div className="navbar-container">

        {/* LOGO */}

        <Link to="/" className="navbar-logo">

          <div className="navbar-logo-icon">
            <ShieldCheck size={21} />
          </div>

          <div>
            <strong>NyaySetu</strong>

            <span>
              Civic Grievance Platform
            </span>
          </div>

        </Link>

        {/* DESKTOP NAVIGATION */}

        <nav className="navbar-links">

          <Link to="/">
            {t.home}
          </Link>

          <Link to="/track">
            {t.track}
          </Link>

          <a href="/#departments">
            {t.departments}
          </a>

        </nav>

        {/* DESKTOP ACTIONS */}

        <div className="navbar-actions">

          <Link
            to="/register"
            className="navbar-register"
          >
            {t.register}
          </Link>

          <button
            className="language-toggle"
            onClick={toggleLanguage}
            aria-label="Change language"
          >
            {language === "en"
              ? "हिंदी"
              : "English"}
          </button>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          <button
            className="mobile-menu-button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>

        </div>

      </div>

      {/* MOBILE MENU */}

      {menuOpen && (

        <div className="mobile-navbar-menu">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            {t.home}
          </Link>

          <Link
            to="/track"
            onClick={() => setMenuOpen(false)}
          >
            {t.track}
          </Link>

          <a
            href="/#departments"
            onClick={() => setMenuOpen(false)}
          >
            {t.departments}
          </a>

          <Link
            to="/register"
            className="mobile-register"
            onClick={() => setMenuOpen(false)}
          >
            {t.register}
          </Link>

        </div>

      )}

    </header>
  );
}

export default Navbar;