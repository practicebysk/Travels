import "./Footer.scss";

// icon
import { SlLocationPin } from "react-icons/sl";
import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { Link } from "@mui/material";

function Footer() {
  return (
    <footer className="footer pt-5 footer-main">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5 className="footer-title">Travosy</h5>
            <p>
              Planning for a trip? We will organize your trip with the best
              places and within the best budget!
            </p>
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fas fa-shopping-cart"></i>
              </a>
              <a href="#" className="icon">
                <i className="fas fa-dribbble"></i>
              </a>
              <a href="#" className="icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="icon">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>

          <div className="col-md-3">
            <h5 className="footer-title">Office</h5>
            <ul className="list-unstyled">
              <li className="d-flex">
                <span className="d-block">
                  <SlLocationPin />
                </span>
                <span className="d-block">
                  C/54 Northwest Freeway, Suite 558, Houston, USA 485
                </span>
              </li>
              <li className="d-flex">
                <span className="d-block">
                  <CiMail />
                </span>
                <span className="d-block">contact@example.com</span>
              </li>
              <li className="d-flex">
                <span className="d-block">
                  <IoCallOutline />
                </span>
                <span className="d-block"> +152 534-468-854</span>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <div>
              <h5 className="footer-title">Company</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to={""}>About us</Link>
                </li>
                <li>
                  <Link to={""}>Services</Link>
                </li>
                <li>
                  <Link to={""}>Team</Link>
                </li>
                <li>
                  <Link to={""}>Pricing</Link>
                </li>
                <li>
                  <Link to={""}>Blog</Link>
                </li>
                <li>
                  <Link to={""}>Login</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-3">
            <h5 className="footer-title">Newsletter</h5>
            <p>Sign up and receive the latest tips via email.</p>
            <form className="w-sm-100">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control border-0"
                  placeholder="Email"
                />
              </div>
              <button
                className="btn btn-danger btn-block mt-2 mb-sm-2"
                onClick={(event) => {
                  event.preventDefault();
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom text-center pt-3">
          <p>
            © 2024 Travosy. Design & Develop with{" "}
            <span className="ms-2">
              <FaHeart />
            </span>{" "}
            by SK.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
