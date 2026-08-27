import { createContext, useContext, useEffect, useState } from "react";
import translations from "../i18n/translations";

const SiteContext = createContext();

export function SiteProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("nyaysetu-language") || "en"
  );

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("nyaysetu-theme") === "dark"
  );

  const t = translations[language];

  useEffect(() => {
    localStorage.setItem("nyaysetu-language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(
      "nyaysetu-theme",
      darkMode ? "dark" : "light"
    );

    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const toggleLanguage = () => {
    setLanguage((current) =>
      current === "en" ? "hi" : "en"
    );
  };

  const toggleTheme = () => {
    setDarkMode((current) => !current);
  };

  return (
    <SiteContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        darkMode,
        toggleTheme,
        t,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  return useContext(SiteContext);
}