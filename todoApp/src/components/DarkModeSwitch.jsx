import { useEffect, useState } from "react";

export const DarkModeSwitch = () => {
  const [theme, setTheme] = useState("");
  const handleChange = (e) => {
    setTheme(e.target.checked ? "dark" : "");
  };
  useEffect(() => {
    const root = document.getElementById("root");
    const app = document.getElementsByClassName("app")[0]; // HTMLCollection'dan ilk elementi seçin
    const head = document.getElementsByClassName("title")[0];
    const tasks = document.getElementsByClassName("tasks")[0];
    if (theme === "dark") {
      app.classList.add("dark"); // Dark tema ise 'dark' class'ını ekle
      root.classList.add("dark");
      head.classList.add("dark");
      tasks.classList.add("dark");
    } else {
      app.classList.remove("dark"); // Dark tema değilse 'dark' class'ını kaldır
      root.classList.remove("dark");
      head.classList.remove("dark");
      tasks.classList.remove("dark");
    }
  }, [theme]);
  return (
    <div className="container-switch">
      <span>Change Theme</span>
      <label className="switch">
        <input
          type="checkbox"
          onChange={handleChange}
          checked={theme === "dark"}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};
