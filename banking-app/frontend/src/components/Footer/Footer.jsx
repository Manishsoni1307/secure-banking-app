import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="container">

        <div className="row">

          {/* Company */}

          <div className="col-lg-4 col-md-6 mb-4">

            <h3 className="footer-logo">
              💳 SecureBank
            </h3>

            <p className="footer-text">
              SecureBank is a modern digital banking platform
              providing secure transactions, instant transfers,
              and 24×7 banking services.
            </p>

          </div>

          {/* Quick Links */}

          <div className="col-lg-2 col-md-6 mb-4">

            <h5>Quick Links</h5>

            <ul className="footer-links">

              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/login">Login</Link>
              </li>

              <li>
                <Link to="/register">Register</Link>
              </li>

            </ul>

          </div>

          {/* Services */}

          <div className="col-lg-3 col-md-6 mb-4">

            <h5>Services</h5>

            <ul className="footer-links">

              <li>Money Transfer</li>

              <li>Online Banking</li>

              <li>Secure Payments</li>

              <li>24×7 Support</li>

            </ul>

          </div>

          {/* Contact */}

          <div className="col-lg-3 col-md-6 mb-4">

            <h5>Contact</h5>

            <p>Email: support@securebank.com</p>

            <p>Phone: +91 98765 43210</p>

            <div className="social-icons">

              <a href="#">
                <FaFacebookF />
              </a>

              <a href="#">
                <FaTwitter />
              </a>

              <a href="#">
                <FaInstagram />
              </a>

              <a href="#">
                <FaLinkedinIn />
              </a>

            </div>

          </div>

        </div>

        <hr />

        <div className="footer-bottom">

          <p>
            © {year} SecureBank. All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;