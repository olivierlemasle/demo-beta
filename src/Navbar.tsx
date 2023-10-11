import { routes } from "./routes";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  if (routes.length === 0) {
    return <nav></nav>;
  }

  return (
    <nav className="Navbar">
      <ul>
        {routes.map((d) => (
          <li key={d.path}>
            <Link to={d.path || "/"}>{d.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
