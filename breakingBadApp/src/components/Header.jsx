import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-svw py-10 flex justify-center ">
      <nav className="w-svw flex justify-center">
        <ul className="w-1/4 flex justify-between items-center ">
          <li>
            <Link to="/">Characters</Link>
          </li>
          <li>
            {" "}
            <Link to="/locations">Locations</Link>
          </li>
          <li>
            {" "}
            <Link to="/episodes">Episodes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
