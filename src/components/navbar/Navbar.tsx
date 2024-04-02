import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            <Link to={`products`}>Products</Link>
          </li>
          <li>
            <Link to={`price-plans`}>Price Plans</Link>
          </li>
          <li>
            <Link to={`pages`}>Pages</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
