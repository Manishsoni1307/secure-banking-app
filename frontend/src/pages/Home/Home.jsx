import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaExchangeAlt,
  FaHeadset,
  FaUsers,
  FaUniversity,
  FaWallet,
  FaCreditCard,
  FaPiggyBank,
  FaHandHoldingUsd,
  FaMobileAlt,
  FaCheckCircle,
  FaStar,
  FaUserPlus,
  FaIdCard,
  FaCheckDouble,
  FaGlobe,
} from "react-icons/fa";
import { SiVisa, SiMastercard } from "react-icons/si";
import { useState, useEffect } from "react";

import hero1 from "../../assets/images/images(1).png";
import hero2 from "../../assets/images/images(2).png";
import hero3 from "../../assets/images/images(3).png";
import hero4 from "../../assets/images/images(4).png";
import hero5 from "../../assets/images/images(5).png";
import hero6 from "../../assets/images/images(6).png";
function Home() {
  const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 1000); // Change every 1 second

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="top-bar">
        <div className="container d-flex justify-content-between align-items-center">
          <span>🏦 India's Most Trusted Digital Banking Platform</span>

          <span>
            📞 +91 98765 43210 &nbsp; | &nbsp; ✉ support@securebank.com
          </span>
        </div>
      </div>
      <Navbar />
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 hero-text">
              <span className="hero-tag">
                India's Trusted Digital Banking Platform
              </span>

              <h1>
                Your Financial <span>Security</span> Is Our{" "}
                <span>Priority</span>
              </h1>

              <p>
                Experience secure digital banking with instant money transfers,
                smart account management, and real-time transaction tracking—
                all in one place.
              </p>

              <div className="hero-buttons">
                <Link to="/register" className="btn btn-primary btn-lg">
                  Open Account
                </Link>

                <Link to="/login" className="btn btn-outline-light btn-lg ms-3">
                  Login
                </Link>
              </div>

              <div className="trust-badges">
                <div>
                  <FaShieldAlt /> Bank-Level Security
                </div>

                <div>
                  <FaExchangeAlt /> Instant Transfers
                </div>

                <div>
                  <FaHeadset /> 24×7 Support
                </div>

                <div>
                  <FaUsers /> 50,000+ Customers
                </div>
              </div>
            </div>

            <div className="col-md-6 text-center">
              <img
                className="hero-img"
                src={heroImages[currentImage]}
                alt="SecureBank"
              />

              <div>
                {heroImages.map((_, index) => (
                  <span
                    key={index}
                    className={
                      currentImage === index ? "dot active-dot" : "dot"
                    }
                    onClick={() => setCurrentImage(index)}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="statistics">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3">
              <div className="stat-card">
                <h2>50K+</h2>

                <p>Happy Customers</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="stat-card">
                <h2>₹250Cr+</h2>

                <p>Transactions Processed</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="stat-card">
                <h2>150+</h2>

                <p>Partner Branches</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="stat-card">
                <h2>99.99%</h2>

                <p>Secure Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <h2 className="section-title">Our Banking Services</h2>

          <p className="section-subtitle">
            Everything you need to manage your money securely.
          </p>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="service-card">
                <FaUniversity className="service-icon" />

                <h4>Savings Account</h4>

                <p>Open a secure savings account with attractive benefits.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="service-card">
                <FaWallet className="service-icon" />

                <h4>Current Account</h4>

                <p>Powerful banking solutions for businesses.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="service-card">
                <FaExchangeAlt className="service-icon" />

                <h4>Money Transfer</h4>

                <p>Transfer funds instantly across any bank.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="service-card">
                <FaCreditCard className="service-icon" />

                <h4>Credit Cards</h4>

                <p>Secure online payments with reward benefits.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="service-card">
                <FaPiggyBank className="service-icon" />

                <h4>Fixed Deposit</h4>

                <p>Grow your savings with higher interest returns.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="service-card">
                <FaHandHoldingUsd className="service-icon" />

                <h4>Personal Loans</h4>

                <p>Quick loan approvals with flexible repayment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}

      <section className="why-us">
        <div className="container">
          <h2 className="section-title">Why Choose SecureBank</h2>

          <p className="section-subtitle">
            We provide a secure, reliable and seamless banking experience for
            every customer.
          </p>

          <div className="row g-4">
            <div className="col-md-3">
              <div className="why-card">
                <FaShieldAlt className="why-icon" />
                <h5>Bank-Level Security</h5>
                <p>256-bit encrypted banking with advanced fraud protection.</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="why-card">
                <FaExchangeAlt className="why-icon" />
                <h5>Instant Transfers</h5>
                <p>Transfer money instantly anytime without delays.</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="why-card">
                <FaGlobe className="why-icon" />
                <h5>Global Banking</h5>
                <p>Access your account securely from anywhere in the world.</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="why-card">
                <FaHeadset className="why-icon" />
                <h5>24×7 Support</h5>
                <p>Friendly customer support whenever you need assistance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="testimonial-card">
                <div className="stars">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                <p>
                  "SecureBank has completely changed the way I manage my
                  finances. Fast and secure!"
                </p>

                <h5>Rahul Sharma</h5>

                <span>Software Engineer</span>
              </div>
            </div>

            <div className="col-md-4">
              <div className="testimonial-card">
                <div className="stars">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                <p>
                  "Excellent customer support and instant transfers. Highly
                  recommended."
                </p>

                <h5>Priya Patel</h5>

                <span>Business Owner</span>
              </div>
            </div>

            <div className="col-md-4">
              <div className="testimonial-card">
                <div className="stars">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                <p>
                  "Very secure platform with a clean interface. Banking has
                  never been easier."
                </p>

                <h5>Amit Verma</h5>

                <span>Entrepreneur</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===========================
      TRUSTED PARTNERS
=========================== */}

      <section className="partners">
        <div className="container">
          <h2 className="section-title">Trusted Payment Partners</h2>

          <p className="section-subtitle">
            SecureBank works with industry-leading payment networks and banking
            partners.
          </p>

          <div className="row g-4 justify-content-center">
            <div className="col-lg-2 col-md-4 col-6">
              <div className="partner-card">
                <SiVisa className="partner-icon" />

                <h5>VISA</h5>
              </div>
            </div>

            <div className="col-lg-2 col-md-4 col-6">
              <div className="partner-card">
                <SiMastercard className="partner-icon" />

                <h5>MasterCard</h5>
              </div>
            </div>

            <div className="col-lg-2 col-md-4 col-6">
              <div className="partner-card">
                <h2>UPI</h2>
              </div>
            </div>

            <div className="col-lg-2 col-md-4 col-6">
              <div className="partner-card">
                <h2>RuPay</h2>
              </div>
            </div>

            <div className="col-lg-2 col-md-4 col-6">
              <div className="partner-card">
                <h2>NPCI</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
{
  /* ===========================
      TRUSTED PARTNERS
=========================== */
}

<section className="partners">
  <div className="container">
    <h2 className="section-title">Trusted Payment Partners</h2>

    <p className="section-subtitle">
      SecureBank works with industry-leading payment networks and banking
      partners.
    </p>

    <div className="row g-4 justify-content-center">
      <div className="col-lg-2 col-md-4 col-6">
        <div className="partner-card">
          <SiVisa className="partner-icon" />

          <h5>VISA</h5>
        </div>
      </div>

      <div className="col-lg-2 col-md-4 col-6">
        <div className="partner-card">
          <SiMastercard className="partner-icon" />

          <h5>MasterCard</h5>
        </div>
      </div>

      <div className="col-lg-2 col-md-4 col-6">
        <div className="partner-card">
          <h2>UPI</h2>
        </div>
      </div>

      <div className="col-lg-2 col-md-4 col-6">
        <div className="partner-card">
          <h2>RuPay</h2>
        </div>
      </div>

      <div className="col-lg-2 col-md-4 col-6">
        <div className="partner-card">
          <h2>NPCI</h2>
        </div>
      </div>
    </div>
  </div>
</section>;

export default Home;
