import "./AboutCompany.scss";

// image
import slider8 from "/assets/aboutCom.jpg";
import backGround from "/assets/backgroundpng.png";
  
// icon
import { RiGlobalLine } from "react-icons/ri";
import { MdOutlinePeople } from "react-icons/md";
import { FaGreaterThan } from "react-icons/fa";

function AboutCompany() {
  return (
    <div className="mt-5 mb-5 text-white justify-content-center d-flex about-com">
      <div className="container">
        <div className="row justify-content-center p-3">
          <div className="col-12 d-flex justify-content-center col-md-6 col-xl-4 main-Image">
            <div className="position-relative d-flex justify-content-center">
              <div>
                <img src={slider8} alt="Travel Image" className="img-fluid" />
              </div>
              <div className="info-card travel-packages shadow-sm">
                <div className="d-flex">
                  <div className="Icon me-2">
                    <RiGlobalLine />
                  </div>
                  <div>
                    <p>Travel Packages</p>
                    <span>50+</span>
                  </div>
                </div>
              </div>
              <div className="info-card visitor shadow-sm">
                <div className="d-flex">
                  <div className="Icon me-2">
                    <MdOutlinePeople />
                  </div>
                  <div>
                    <p>Visitor</p>
                    <span>4,589</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-8 about-com-sec">
            <div>
              <h3>World Best Travel</h3>
              <br />
              <h3>Agency: Travosy</h3>
            </div>
            <div className="mt-4 mb-3">
              <p>
                Get instant helpful resources about anything on the go, easily
                implement secure money transfer solutions, boost your daily
                efficiency, connect to other app users, and much more with just
                a few taps.
              </p>
            </div>
            <div>
              <button className="bg-danger d-flex rounded-2 text-white border-0">
                Read More
                <p style={{ fontSize: "10px" }}>
                  <FaGreaterThan />
                </p>
              </button>
            </div>
            <div className="position-absolute img back-Image">
              <img
                src={backGround}
                alt="Background Image"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutCompany;
