import { useEffect, useState } from "react";
import "./HeroImage.scss";
import { fetchPlaceList } from "../../../service/actions";

// icon
import { BsList } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { BsPeopleFill } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { RiPagesLine } from "react-icons/ri";
import { MdContactPage } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

// images
import imgLogo from "/assets/th.png";

function HeroImage() {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [isScrolled, setIsScrolled] = useState(
    window.innerWidth < 990 ? false : true
  );
  const [openTopNavbar, setOpenTopNavbar] = useState(false);
  const [activeTab, setActiveTab] = useState("Hero");
  const [searchValue, setSearchValue] = useState({
    search: "",
    fromDate: "",
    toDate: "",
  });

  const scrollToSec = (tab, value) => {
    setActiveTab(tab);
    window.scrollTo({
      top: value,
      behavior: "smooth",
    });
  };

  const changeInputValue = (e) => {
    setSearchValue({ ...searchValue, [e.target.name]: e.target.value });
  };

  // const searchData = () => {
  //   dispatch(fetchPlaceList(
  //       searchValue.search,
  //       searchValue.fromDate,
  //       searchValue.toDate)
  //   );
  //   navigate("/place?query=search");
  // };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY < 123 ? true : false);
      if (window.scrollY <= 850) {
        setActiveTab("Hero");
      } else if (window.scrollY > 849.5 && window.scrollY <= 1449.5) {
        setActiveTab("Listing");
      } else if (window.scrollY > 1449.5 && window.scrollY <= 2349.5) {
        setActiveTab("Pages");
      } else if (window.scrollY > 2350) {
        setActiveTab("ContactUs");
      }
    };
    const handleResize = () => {
      setIsScrolled(window.innerWidth > 990 ? true : false);
      if (window.innerWidth > 990) {
        setOpenTopNavbar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="container-fluid p-0 position-relative overflow-hidden bg-image-hero">
        <div
          className={`${
            window.innerWidth < 990 && window.scrollY < 123
              ? "top-nav-dark p-3 text-white"
              : ""
          } ${
            !isScrolled ? "row position-fixed p-3 top-0 top-navabr-fixed" : ""
          }`}
        >
          <div
            className={`col-6 
            text-white
            fw-bold`}
            style={{ cursor: "pointer" }}
            onClick={() => scrollToSec("Hero", 0)}
          >
            <img src={imgLogo} alt="logo" style={{ rotate: "30deg" }} />
            TRAVOSY
          </div>
          <div
            className={`col-6 
            ${
              isScrolled
                ? "justify-content-end position-absolute po-top-end-pos"
                : ""
            }`}
          >
            {window.innerWidth > 990 && (
              <div className="d-flex justify-content-around">
                <div className={`${activeTab === "Hero" ? "text-danger" : ""}`}>
                  <span onClick={() => scrollToSec("Hero", 0)}>
                    <span className="pe-1 fs-5">
                      <IoMdHome className="icon" />
                    </span>
                    Hero
                  </span>
                </div>
                <div
                  className={`${activeTab === "Listing" ? "text-danger" : ""}`}
                >
                  <span onClick={() => scrollToSec("Listing", 850)}>
                    <span className="pe-1 fs-5">
                      <HiClipboardDocumentList className="icon" />
                    </span>
                    Listing
                  </span>
                </div>
                <div
                  className={`${activeTab === "Pages" ? "text-danger" : ""}`}
                >
                  <span onClick={() => scrollToSec("Pages", 1450)}>
                    <span className="pe-1 fs-5">
                      <RiPagesLine className="icon" />
                    </span>
                    Pages
                  </span>
                </div>
                <div
                  className={`col-2 ${
                    activeTab === "ContactUs" ? "text-danger" : ""
                  }`}
                >
                  <span onClick={() => scrollToSec("ContactUs", 2750)}>
                    <span className="pe-1 fs-5">
                      <MdContactPage className="icon" />
                    </span>
                    Contact Us
                  </span>
                </div>
              </div>
            )}
            {window.innerWidth < 990 && (
              <div>
                <div className="d-flex justify-content-end">
                  <span onClick={() => setOpenTopNavbar(!openTopNavbar)}>
                    <BsList />
                  </span>
                </div>
              </div>
            )}
          </div>
          {openTopNavbar && (
            <div
              className="top-nav-dropdown position-absolute start-0 w-100"
              style={{ top: "55px", zIndex: "1" }}
            >
              <div>
                <ul className="list-group">
                  <li
                    className={`p-3 ${
                      activeTab === "Hero" ? "text-danger" : ""
                    }`}
                    onClick={() => scrollToSec("Hero", 0)}
                  >
                    Hero
                  </li>
                  <li
                    className={`p-3 ${
                      activeTab === "Listing" ? "text-danger" : ""
                    }`}
                    onClick={() => scrollToSec("Listing", 850)}
                  >
                    Listing
                  </li>
                  <li
                    className={`p-3 ${
                      activeTab === "Pages" ? "text-danger" : ""
                    }`}
                    onClick={() => scrollToSec("Pages", 1500)}
                  >
                    Pages
                  </li>
                  <li
                    className={`p-3 ${
                      activeTab === "ContactUs" ? "text-danger" : ""
                    }`}
                    onClick={() => scrollToSec("ContactUs", 6000)}
                  >
                    Contact Us
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="position-absolute text-white po-top-end-pos-h1 w-100">
          <h4 className="curs-font">Beauty of Discovers</h4>
          <div>
            <h1 className="mb-4 mt-4">
              Let's Leave The Road, <br /> And Take The Travosy
            </h1>
            <p className="hero-p-tag-text">
              Planning for a trip? We will organize your trip with the best{" "}
              <br />
              places and within best budget!
            </p>
          </div>
        </div>
      </div>
      {/* <div className="d-flex justify-content-center mt-2">
        <div
          className="top-nav-dropdown row search-bar rounded-1 text-white d-flex justify-content-between"
          style={{ padding: "20px" }}
        >
          <div className="col-12 col-sm-6 mt-2 mt-xl-0  col-xl-2">
            <label htmlFor="search">Search:</label>
            <br />
            <CiSearch htmlFor="search" className="icon" />
            <input
              type="text"
              id="search"
              placeholder="search"
              name="search"
              value={searchValue.search}
              onChange={(e) => changeInputValue(e)}
            />
          </div>
          <div className="col-12 col-sm-6 mt-2 mt-xl-0 col-xl-2">
            <label htmlFor="search">Select From Date:</label>
            <br />
            <input
              type="date"
              id="search"
              name="fromDate"
              value={searchValue.fromDate}
              onChange={(e) => changeInputValue(e)}
            />
          </div>
          <div className="col-12 col-sm-6 mt-2 mt-xl-0 col-xl-2">
            <label htmlFor="search">Select To Date:</label>
            <br />
            <input
              type="date"
              id="search"
              name="toDate"
              value={searchValue.toDate}
              onChange={(e) => changeInputValue(e)}
            />
          </div>
          <div className="col-12 col-sm-6  mt-2 mt-xl-0  col-xl-2">
            <label htmlFor="search">No. of person:</label>
            <br />
            <BsPeopleFill className="icon" />

            <select name="" id="">
              <option value="" defaultChecked>
                No .of person
              </option>
              <option value="" defaultChecked>
                1
              </option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="col-12 col-sm-6 col-xl-2">
            <button
              className="rounded-2 bg-danger border-0 text-white w-100"
              onClick={searchData}
            >
              Submit
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default HeroImage;
