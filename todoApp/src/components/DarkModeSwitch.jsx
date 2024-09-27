import { useEffect, useState } from "react";

export const DarkModeSwitch = () => {
  // Kullanıcının tercih ettiği temayı localStorage'dan alıyoruz
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "");

  const handleChange = (e) => {
    const selectedTheme = e.target.checked ? "dark" : "";
    setTheme(selectedTheme);
    // Temayı localStorage'a kaydediyoruz
    localStorage.setItem("theme", selectedTheme);
  };
  useEffect(() => {
    const root = document.getElementById("root");
    const app = document.querySelector(".app");
    const head = document.querySelector(".title");
    const tasks = document.querySelectorAll(".tasks, .tasksSection li, input");
    const headerSec = document.querySelector(".todoApp");
    const header = document.querySelector(".header");
    const darkModeSec = document.querySelector(".container-switch");
    const footer = document.querySelector(".footer");

    if (theme === "dark") {
      app.classList.add("darkApp");
      root.classList.add("dark");
      head.classList.add("dark");
      headerSec.classList.add("dark");
      header.classList.add("dark");
      darkModeSec.classList.add("dark");
      footer.classList.add("dark");

      tasks.forEach((task) => task.classList.add("dark"));
    } else {
      app.classList.remove("darkApp");
      root.classList.remove("dark");
      head.classList.remove("dark");
      headerSec.classList.remove("dark");
      header.classList.remove("dark");
      darkModeSec.classList.remove("dark");
      footer.classList.remove("dark");

      tasks.forEach((task) => task.classList.remove("dark"));
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
