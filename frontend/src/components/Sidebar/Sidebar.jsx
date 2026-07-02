import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaWallet,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaHistory,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <h2>💳 SecureBank</h2>
      </div>

      <ul className="sidebar-menu">

        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <FaHome />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/accounts"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <FaWallet />
            <span>Accounts</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/deposit"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <FaMoneyBillWave />
            <span>Deposit</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/transfer"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <FaExchangeAlt />
            <span>Transfer</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <FaHistory />
            <span>Transactions</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <FaUserCircle />
            <span>Profile</span>
          </NavLink>
        </li>

      </ul>

      <div className="sidebar-footer">

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;