import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 🌟 Added for eye toggles

import "./Register.css";
import API from "../../services/api";
import Navbar from "../../components/Navbar/Navbar"; // 🌟 Added Navbar
import Footer from "../../components/Footer/Footer"; // 🌟 Added Footer

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  // 🌟 Password toggle states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return false;
    }

    if (name.length < 3) {
      toast.error("Name must be at least 3 characters.");
      return false;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email.");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Registration Successful! 🎉");
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="register-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="register-card">
                <div className="register-icon">👤</div>
                <h2>Create Account</h2>
                <p className="subtitle">Start your SecureBank journey.</p>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label className="form-label">Full Name</label>

                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label">Email Address</label>

                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={profile.email}
                        disabled
                      />

                      <small className="text-muted">
                        Email cannot be changed.
                      </small>
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label">Mobile Number</label>

                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label">Residential Address</label>

                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                      />
                    </div>
                  </div>

                  <hr className="my-4" />

                  <h4 className="mb-4">Account Information</h4>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="info-box">
                        <h6>Customer ID</h6>

                        <p>SB20260001</p>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div className="info-box">
                        <h6>Account Type</h6>

                        <p>Savings Account</p>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div className="info-box">
                        <h6>Account Number</h6>

                        <p>XXXX XXXX 4587</p>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div className="info-box">
                        <h6>KYC Status</h6>

                        <p className="text-success fw-bold">✔ Verified</p>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-4">
                    <button
                      className="btn btn-primary btn-lg px-5"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>
                          Updating...
                        </>
                      ) : (
                        "Update Profile"
                      )}
                    </button>
                  </div>
                </form>

                <div className="login-link-container text-center mt-4">
                  Already have an account?
                  <Link to="/login" className="ms-2 login-link">
                    Login
                  </Link>
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

export default Register;
