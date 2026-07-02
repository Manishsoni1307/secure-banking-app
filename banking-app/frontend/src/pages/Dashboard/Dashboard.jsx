import {
  MonthlySpendingChart,
  IncomeExpenseChart,
} from "../../components/DashboardCharts/DashboardCharts";
import { useState } from "react";
import "./Dashboard.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaExchangeAlt,
  FaPaperPlane,
  FaMoneyCheckAlt,
  FaMoneyBillWave,
  FaFileInvoice,
} from "react-icons/fa";

import { FaMoon, FaSun } from "react-icons/fa";

function Dashboard() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );
  return (
    <>
      <Navbar />

      <div className={darkMode ? "dashboard dark-mode" : "dashboard"}>
        <div className="container">
          {/* Welcome */}

          <div className="dashboard-header">
            <div>
              <h2 style={{ color: "red", fontSize: "60px" }}>
                THIS IS MY DASHBOARD
              </h2>

              <p>Here's what's happening with your account today.</p>
            </div>
            <button
              className="theme-btn"
              onClick={() => {
                const next = !darkMode;
                setDarkMode(next);
                localStorage.setItem("theme", next ? "dark" : "light");
              }}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>

          {/* SUMMARY CARDS */}

          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="summary-card balance">
                <div className="card-icon">
                  <FaWallet />
                </div>

                <div>
                  <h6>Current Balance</h6>

                  <h3>₹1,25,400</h3>

                  <span className="increase">+8.2% this month</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="summary-card income">
                <div className="card-icon">
                  <FaArrowUp />
                </div>

                <div>
                  <h6>Income</h6>

                  <h3>₹58,000</h3>

                  <span className="increase">+12% this month</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="summary-card expense">
                <div className="card-icon">
                  <FaArrowDown />
                </div>

                <div>
                  <h6>Expenses</h6>

                  <h3>₹21,350</h3>

                  <span className="decrease">-5% this month</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="summary-card transfer">
                <div className="card-icon">
                  <FaExchangeAlt />
                </div>

                <div>
                  <h6>Total Transactions</h6>

                  <h3>245</h3>

                  <span>Completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}

          <div className="quick-actions">
            <h3 className="section-title">Quick Actions</h3>

            <div className="row g-4">
              <div className="col-lg-3 col-md-6">
                <div className="action-card">
                  <FaPaperPlane className="action-icon" />

                  <h5>Transfer Money</h5>

                  <p>Send money instantly.</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="action-card">
                  <FaMoneyCheckAlt className="action-icon" />

                  <h5>Deposit</h5>

                  <p>Deposit funds securely.</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="action-card">
                  <FaMoneyBillWave className="action-icon" />

                  <h5>Withdraw</h5>

                  <p>Withdraw your balance.</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="action-card">
                  <FaFileInvoice className="action-icon" />

                  <h5>Statement</h5>

                  <p>Download account statement.</p>
                </div>
              </div>
            </div>
          </div>
          {/* </div>
      </div> */}
          {/* ===========================
      DASHBOARD CONTENT
=========================== */}

          <div className="row mt-5">
            {/* Monthly Spending */}

            <div className="col-lg-8 mb-4">
              <div className="dashboard-box">
                <h4>Monthly Spending</h4>
                <MonthlySpendingChart />
              </div>
            </div>

            {/* Account Summary */}

            <div className="col-lg-4 mb-4">
              <div className="dashboard-box">
                <h4>Account Summary</h4>

                <ul className="summary-list">
                  <li>
                    <span>Account Number</span>
                    <strong>XXXX 4587</strong>
                  </li>

                  <li>
                    <span>Account Type</span>
                    <strong>Savings</strong>
                  </li>

                  <li>
                    <span>Branch</span>
                    <strong>Mumbai</strong>
                  </li>

                  <li>
                    <span>Status</span>
                    <span className="status-active">Active</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Income vs Expense */}

          {/* ===========================
      Income vs Expense
=========================== */}

          <div className="dashboard-box mt-4">
            <h4>Income vs Expense</h4>

            <IncomeExpenseChart />
          </div>

          {/* ===========================
      Recent Transactions
=========================== */}

          <div className="dashboard-box mt-5">
            <h4 className="mb-4">Recent Transactions</h4>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Salary Credit</td>
                    <td className="text-success fw-bold">+ ₹45,000</td>
                    <td>01 Jul 2026</td>
                    <td>
                      <span className="badge bg-success">Completed</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Amazon</td>
                    <td className="text-danger fw-bold">- ₹2,499</td>
                    <td>30 Jun 2026</td>
                    <td>
                      <span className="badge bg-success">Completed</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Electricity Bill</td>
                    <td className="text-danger fw-bold">- ₹1,250</td>
                    <td>29 Jun 2026</td>
                    <td>
                      <span className="badge bg-warning text-dark">
                        Pending
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>Netflix</td>
                    <td className="text-danger fw-bold">- ₹649</td>
                    <td>28 Jun 2026</td>
                    <td>
                      <span className="badge bg-success">Completed</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Transfer to Rahul</td>
                    <td className="text-danger fw-bold">- ₹5,000</td>
                    <td>27 Jun 2026</td>
                    <td>
                      <span className="badge bg-danger">Failed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row mt-5">
            {/* Debit Card */}
            <div className="col-lg-4 mb-4">
              <div className="debit-card">
                <div className="card-inner">
                  {/* FRONT */}
                  <div className="card-front">
                    <div className="card-header">
                      <h4>💳 SecureBank</h4>
                      <h5>VISA</h5>
                    </div>

                    <div className="card-chip">
                      <div className="chip-lines"></div>
                    </div>

                    <div className="contactless">)))</div>

                    <h3 className="card-number">
                      4587&nbsp;&nbsp;2034&nbsp;&nbsp;9988&nbsp;&nbsp;7412
                    </h3>

                    <div className="card-footer">
                      <div>
                        <small>Card Holder</small>
                        <h6>MANISH SONI</h6>
                      </div>

                      <div>
                        <small>Expires</small>
                        <h6>08 / 29</h6>
                      </div>
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="card-back">
                    <div className="black-strip"></div>

                    <div className="cvv-box">
                      <span>CVV</span>
                      <strong>742</strong>
                    </div>

                    <p className="back-text">
                      This card is property of SecureBank. Unauthorized use is
                      prohibited.
                    </p>

                    <h5 className="visa-back">VISA</h5>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Goal */}
            <div className="col-lg-4 mb-4">
              <div className="dashboard-box">
                <h4>Savings Goal</h4>

                <h2>₹75,000</h2>

                <p>You've saved 68% of your yearly goal.</p>

                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    style={{ width: "68%" }}
                  >
                    68%
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="col-lg-4 mb-4">
              <div className="dashboard-box">
                <h4>Notifications</h4>

                <ul className="notification-list">
                  <li>✅ Salary credited successfully.</li>
                  <li>💸 Money transferred to Rahul.</li>
                  <li>🔐 Password updated recently.</li>
                  <li>📄 Monthly statement is available.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="dashboard-box">
                <h4>Upcoming Payments</h4>

                <table className="table">
                  <tbody>
                    <tr>
                      <td>Electricity Bill</td>

                      <td>₹1,450</td>

                      <td>05 Jul</td>
                    </tr>

                    <tr>
                      <td>Netflix</td>

                      <td>₹649</td>

                      <td>08 Jul</td>
                    </tr>

                    <tr>
                      <td>Internet</td>

                      <td>₹999</td>

                      <td>10 Jul</td>
                    </tr>

                    <tr>
                      <td>Mobile Recharge</td>

                      <td>₹399</td>

                      <td>12 Jul</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="dashboard-box">
                <h4>Profile Summary</h4>

                <div className="profile-box">
                  <div className="profile-avatar">👤</div>

                  <h5>Manish Soni</h5>

                  <p>Savings Account</p>

                  <hr />

                  <p>
                    <strong>Email</strong>
                    <br />
                    manish@gmail.com
                  </p>

                  <p>
                    <strong>Phone</strong>
                    <br />
                    +91 9876543210
                  </p>

                  <p>
                    <strong>KYC</strong>

                    <span className="verified">Verified</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
