import { Link } from "react-router-dom";
import { DarkModeSwitch } from "./DarkMode";

export default function Header() {
  return (
    <header className="w-svw py-10 flex justify-center bg-slate-400 dark:bg-slate-950">
      <nav className="w-2/3 flex justify-center text-slate-200 ">
        <ul className="w-1/4 flex justify-between items-center ">
          <li>
            <Link to="/">Characters</Link>
          </li>

          <li>
            {" "}
            <Link to="/episodes">Episodes</Link>
          </li>
          <li>
            {" "}
            <Link to="/locations">Locations</Link>
          </li>
        </ul>
      </nav>
      <DarkModeSwitch />
    </header>
  );
}
