import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email");
      return false;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const result = await login(formData.email, formData.password);

      if (result.success) {
        toast.success(result.message);
        navigate("/dashboard");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="login-card">
                <div className="login-icon">🏦</div>
                <h2>Welcome Back</h2>
                <p className="subtitle">Login to your SecureBank account</p>

                <form onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Password Field 🌟 (Removed duplicate block from here) */}
                  <div className="mb-4">
                    <label>Password</label>
                    <div className="password-box">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <span
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="password-strength mb-4">
                      <div
                        className={`strength-bar ${
                          formData.password.length >= 8
                            ? "strong"
                            : formData.password.length >= 5
                              ? "medium"
                              : "weak"
                        }`}
                      />
                      <small>
                        {formData.password.length >= 8
                          ? "Strong Password"
                          : formData.password.length >= 5
                            ? "Medium Password"
                            : "Weak Password"}
                      </small>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary w-100 login-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Logging In...
                      </span>
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>

                <div className="register-link">
                  Don't have an account? <Link to="/register">Register</Link>
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

export default Login;
