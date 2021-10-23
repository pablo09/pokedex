import React from "react";
import { SecurityContext } from "../context/security-context";
import { Link } from "react-router-dom";

export const NavigationPanel = () => {
  const { loggedUser, onLogout } = React.useContext(SecurityContext);
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"
              alt=""
              width="30"
              height="24"
              className="d-inline-block align-text-top mr-1"
            />
            Pokedex
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mb-2 mb-lg-0 me-5 text-nowrap text-decoration-none">
            {loggedUser ? (
              <>
                <NavItem to="/my-collection" label="My collection" />
                <NavItem to="/profile" label={loggedUser.username} />
                <NavItem to="/" label="Sign out" onClick={onLogout} />
              </>
            ) : (
              <NavItem label="Sign in" to="/login" />
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

interface NavItemProps {
  label: string;
  to: string;
  onClick?: () => void;
}

const NavItem = (props: NavItemProps) => {
  const { label, to, onClick } = props;

  return (
    <li className="nav-item">
      <Link className="nav-link active" to={to} onClick={onClick}>
        {label}
      </Link>
    </li>
  );
};
