import { useEffect, useState } from "react";

export const DarkModeSwitch = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="container-switch">
      <span className="text-slate-200">Change Theme</span>
      <label className="switch">
        <input type="checkbox" checked={darkMode} onChange={handleDarkMode} />
        <span className="slider"></span>
      </label>
    </div>
  );
};
