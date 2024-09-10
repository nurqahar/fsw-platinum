import React from "react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

const Footer = () => {
  return (
    <footer className="footer bg-light text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Company Name</h5>
            <p>
              Innovating solutions to drive your bussiness forward. Our mission
              is to deliver quality and value in everything we dow
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <Link to="/" className="text-dark">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-dark">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-dark">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-dark">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Follow Us</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#" className="text-dark">
                  <i className="fab fa-facebook-f">Facebook</i>
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  <i className="fab fa-twitter-f">Twitter</i>
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  <i className="fab fa-linkedin-f">Linkedin</i>
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  <i className="fab fa-instagram-f">Instagram</i>
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Follow Us</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <p className="text-dark">
                  <i className="fas fa-map-marker-alt">
                    123 Bussiness Rd. Bussines City, BC 12345
                  </i>
                </p>
              </li>
              <li>
                <p className="text-dark">
                  <i className="fas fa-phone">+123 4234535</i>
                </p>
              </li>
              <li>
                <p className="text-dark">
                  <i className="fas fa-phone">info@comp.com</i>
                </p>
              </li>
            </ul>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-lg-12 d-flex justify-content-between align-items-center">
                <div className="text-center p-3">
                  2024 Company Name. All Rights Reserved
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
