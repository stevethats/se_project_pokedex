import { Link } from "react-router-dom";

import "./Header.css";
import pokeball from "../assets/pokeball.png";

function Header() {
  return (
    <header className="header">
      <span className="header__home">
        <img
          src={pokeball}
          alt="pokeball image"
          className="header__home-image"
        />
        <Link to="/" className="header__home-label">
          Pokédex
        </Link>
      </span>
      <Link to="/about" className="header__about">
        About
      </Link>
    </header>
  );
}

export default Header;
