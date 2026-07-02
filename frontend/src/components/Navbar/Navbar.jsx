import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm sticky-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          💳 SecureBank
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>

            {token ? (
              <>
                <li className="nav-item">
                  <NavLink to="/dashboard" className="nav-link">
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/accounts" className="nav-link">
                    Accounts
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/transactions" className="nav-link">
                    Transactions
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/profile" className="nav-link">
                    Profile
                  </NavLink>
                </li>

                <li className="nav-item ms-lg-3">
                  <button
                    className="btn btn-danger logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>

                <li className="nav-item ms-lg-3">
                  <NavLink
                    to="/register"
                    className="btn btn-primary register-btn"
                  >
                    Open Account
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
