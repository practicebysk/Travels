import { useEffect, useState } from "react";
import "./placeList.scss";
// img
import slider3 from "/assets/slider3.jpg";
import slider2 from "/assets/slider2.jpg";
import slider1 from "/assets/slider1.jpg";
// icon
import { IoCameraOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";
import { VscGraphLine } from "react-icons/vsc";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { RiGlobalLine } from "react-icons/ri";
import { PiCurrencyDollar } from "react-icons/pi";
import { BsPeopleFill } from "react-icons/bs";
import StarRatings from "react-star-ratings";
import { FaHeart, FaLongArrowAltRight } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

// accroding
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { getPlace } from "../../service/API";
import { toast } from "react-toastify";
import Lightbox from "yet-another-react-lightbox";

function PlaceList({ imageData, imageAllData }) {
  const filterList = {
    place: [
      { name: "Bali Park", isSld: false },
      { name: "Dubai", isSld: false },
      { name: "Italy", isSld: false },
      { name: "Bali Park", isSld: false },
      { name: "Bali Park", isSld: false },
      { name: "Bali Park", isSld: false },
    ],
    stars: [
      {
        name: 5,
        isSld: false,
      },
      {
        name: 4,
        isSld: false,
      },
      {
        name: 3,
        isSld: false,
      },
      {
        name: 2,
        isSld: false,
      },
      {
        name: 1,
        isSld: false,
      },
    ],
    price: 100,
  };
  const navigate = useNavigate();
  const [sigleData, getsigleData] = useState();
  const [allData, getAllData] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState("panel1");
  const [placeFilterList, setPlaceFilterList] = useState(filterList);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [applyForm, setApplyForm] = useState({
    date: "",
    adult: "",
    children: "",
  });

  const images = [sigleData?.img, slider3, slider1, slider2];

  // accroding
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const likePacked = (index) => {
    allData.forEach((img, i) => {
      if (i === index) {
        img["liked"] = !img.liked;
      } else {
        img["liked"] = false;
      }
    });
    getAllData([...allData]);
  };

  const handleSliderChange = (event) => {
    placeFilterList.price = event.target.value;
    setPlaceFilterList({ ...placeFilterList });
    fetchData();
  };

  const handleCheckStarChange = (index) => {
    placeFilterList.stars.forEach((item, i) => {
      if (i === index) {
        item.isSld = !item.isSld;
      }
    });
    setPlaceFilterList({ ...placeFilterList });
    fetchData();
  };

  const handleCheckPlaceChange = (index) => {
    placeFilterList.place.forEach((item, i) => {
      if (i === index) {
        item.isSld = !item.isSld;
      }
    });
    setPlaceFilterList({ ...placeFilterList });
    fetchData();
  };

  const navigateDetailsPage = (index) => {
    navigate(`/place?id=${index}`);
  };

  const handleChangeData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyForm = (e) => {
    setApplyForm({ ...applyForm, [e.target.name]: e.target.value });
  };

  const handleSubmitData = () => {
    const { name, email, comment } = formData;
    if (name && email && comment) {
      toast.success("Comment submitted successfully!");
      setFormData({
        name: "",
        email: "",
        comment: "",
      });
    } else {
      toast.error("All fields are required.");
    }
  };

  const handleSubmitApplyform = () => {
    const { date, adult, children } = applyForm;
    if (date && (adult || children)) {
      toast.success("Success");
      setApplyForm({
        date: "",
        adult: "",
        children: "",
      });
    } else {
      toast.error("All fields are required.");
    }
  };

  const fetchData = async () => {
    try {
      const data = await getPlace("place");
      if (data) {
        const { place, stars, price } = placeFilterList;
        const sldPlace = place.filter((sldPlc) => sldPlc.isSld);
        const sldStar = stars.filter((sldPlc) => sldPlc.isSld);

        const sldStarsData = data.filter((dataItem) => {
          const isPlaceMatch = sldPlace.length
            ? sldPlace.some((sldP) => sldP.name === dataItem.location)
            : true;
          const isStarMatch = sldStar.length
            ? sldStar.some((sldP) => sldP.name === dataItem.avgRate)
            : true;
          return isPlaceMatch && isStarMatch && dataItem.price <= price;
        });
        getAllData([...sldStarsData]);
      }
      return data;
    } catch (error) {
      console.error("Failed to fetch places:", error);
      return null;
    }
  };

  useEffect(() => {
    if (imageData) {
      getsigleData(imageData);
    }
    if (imageAllData) {
      getAllData(imageAllData);
    }
  }, [imageData, imageAllData]);

  return (
    <div className="mt-5 mb-5 text-white justify-content-center d-flex">
      {imageAllData && (
        <>
          <div className="main-80-width">
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-8 main-image-div">
                  <div className="row">
                    {allData?.map((imgs, i) => (
                      <div className="col-12 mb-3" key={i}>
                        <div
                          className="card card-bg-image"
                          style={{ position: "relative" }}
                        >
                          <div className="row">
                            <div className="col-12 col-md-4">
                              <div className="image-container">
                                <img
                                  src={imgs.img}
                                  className="card-img-top"
                                  alt="Card"
                                />
                                <div className="discount-badge">
                                  {imgs.discount}% Off
                                </div>
                                <div
                                  className="like-button-overlay"
                                  onClick={() => likePacked(i)}
                                >
                                  {imgs.liked ? (
                                    <FaHeart color="red" />
                                  ) : (
                                    <CiHeart />
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-8 card-body pb-1">
                              <div className="d-flex">
                                <span className="card-title">
                                  <IoLocationOutline /> {imgs.location}
                                </span>
                              </div>
                              <span className="card-text">{imgs.name}</span>
                              <div className="d-flex mt-2">
                                <span
                                  style={{
                                    color: "#ffffff80",
                                    fontSize: "15px",
                                  }}
                                >
                                  Rating:
                                </span>
                                <span className="star d-flex">
                                  <span>
                                    <StarRatings
                                      rating={imgs.avgRate} // Set default rating
                                      starRatedColor="gold"
                                      numberOfStars={5}
                                      starDimension="17px"
                                      starSpacing="2px"
                                      name="rating"
                                    />
                                  </span>
                                  <span className="value">
                                    {imgs.avgRate}({imgs.totalRate})
                                  </span>
                                </span>
                              </div>
                              <div className="card-bottom border border-bottom-0 border-start-0 border-end-0 border-top-1 border-secondary mt-3">
                                <div className="d-flex text-white justify-content-between mt-3">
                                  <span className="text-danger">
                                    $ {imgs.price} / Day
                                  </span>
                                  <p
                                    className="text-decoration-none text-white"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigateDetailsPage(imgs.id)}
                                  >
                                    Explore Now <FaLongArrowAltRight />
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="col-12 col-lg-4"
                  // style={{ position: "sticky", top: "0", alignSelf: "start" }}
                >
                  <div className="tour-search-main-sidebar">
                    <div className="price-slider">
                      <h3>Price Filter</h3>
                      <div className="slider-container">
                        <span>$50</span>
                        <input
                          type="range"
                          min="50"
                          max="200"
                          value={placeFilterList.price}
                          onChange={handleSliderChange}
                          className="slider"
                        />
                        <span>$200</span>
                      </div>
                      <div className="price-output">
                        Selected Price: ${placeFilterList.price}
                      </div>
                    </div>
                    <div className="reviews-section">
                      <h3>Reviews</h3>
                      {placeFilterList.stars.map((ele, index) => (
                        <div key={index} className="rating-item">
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            checked={ele.isSld}
                            onChange={() => handleCheckStarChange(index)}
                          />
                          <div className="stars">
                            <StarRatings
                              rating={ele.name}
                              starRatedColor="gold"
                              numberOfStars={5}
                              starDimension="17px"
                              starSpacing="2px"
                              name="rating"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="booking-activity">
                      <h3>Booking Activity</h3>
                      <ul>
                        {placeFilterList.place.map((ele, index) => {
                          return (
                            <li key={index}>
                              <input
                                type="checkbox"
                                checked={ele.isSld}
                                onChange={() => handleCheckPlaceChange(index)}
                              />{" "}
                              {ele.name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div>
                      <h5 className="ms-1 mt-3">Tour Map</h5>
                      <div className="map-main mt-5 mb-5">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387194.0622732494!2d-74.30932777004287!3d40.697019286161634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1727191074570!5m2!1sen!2sin"
                          width="100%"
                          height="100%"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="map-iframe"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {imageData && (
        <>
          <div className="main-80-width">
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-8  main-image-div">
                  <div className="container">
                    <div className="row">
                      {images.map((ele, index) => (
                        <div
                          className={`${
                            index === 0 || index === 3
                              ? "col-7 col-sm-8"
                              : "col-5 col-sm-4"
                          } position-relative image-container`}
                          key={index}
                        >
                          <img
                            src={ele}
                            alt=""
                            width="100%"
                            height="95%"
                            className="rounded-3 object-fit-cover"
                          />
                          <span className="camera-icon">
                            <IoCameraOutline
                              onClick={() => {
                                setCurrentIndex(index);
                                setOpen(true);
                              }}
                            />
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="row mt-2">
                      <h4>Hot Baloon Journey</h4>
                      <p className="main-location d-inline">
                        <span className="grey">
                          <IoLocationOutline />
                        </span>
                        BangKok
                      </p>
                      <div className="row main-location-part">
                        <div className="col d-flex">
                          <span>
                            <MdOutlineWatchLater />
                          </span>
                          <div>
                            <p className="d-inline font-15px">Duration</p>
                            <p className="grey font-13px">2 Day</p>
                          </div>
                        </div>
                        <div className="col d-flex">
                          <span>
                            <VscGraphLine />
                          </span>
                          <div>
                            <p className="d-inline font-15px">Type</p>
                            <p className="grey font-13px">Adventure</p>
                          </div>
                        </div>
                        <div className="col d-flex">
                          <span>
                            <MdOutlinePeopleOutline />
                          </span>
                          <div>
                            <p className="d-inline font-15px">Group Size</p>
                            <p className="grey font-13px">50 Peoples</p>
                          </div>
                        </div>
                        <div className="col d-flex">
                          <span>
                            <RiGlobalLine />
                          </span>
                          <div>
                            <p className="d-inline font-15px">Languages</p>
                            <p className="grey font-13px">English</p>
                          </div>
                        </div>
                        <div className="col d-flex">
                          <span>
                            <PiCurrencyDollar />
                          </span>
                          <div>
                            <p className="d-inline font-15px">$50 / Person</p>
                            <p className="grey font-13px">1 Day</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="mb-3 mt-2">Tour Descriptions:</h5>
                        <p className="grey font-15px">
                          The most well-known dummy text is the 'Lorem Ipsum',
                          which is said to have originated in the 16th century.
                          Lorem Ipsum is composed in a pseudo-Latin language
                          which more or less corresponds to 'proper' Latin. It
                          contains a series of real Latin words. This ancient
                          dummy text is also incomprehensible, but it imitates
                          the rhythm of most European languages in Latin script.{" "}
                          <br />
                          The advantage of its Latin origin and the relative
                          meaninglessness of Lorum Ipsum is that the text does
                          not attract attention to itself or distract the
                          viewer's attention from the layout.
                        </p>
                      </div>
                      <div>
                        <h5 className="mb-3 mt-2">Questions & Answers:</h5>
                        <div className="">
                          <div
                            style={{
                              borderRadius: "10px",
                            }}
                          >
                            <Accordion
                              expanded={expanded === "panel1"}
                              onChange={handleChange("panel1")}
                              style={{ color: "#fff" }}
                              className="main-accordion"
                            >
                              <AccordionSummary
                                expandIcon={
                                  <ExpandMoreIcon
                                    style={{
                                      color:
                                        expanded === "panel1" ? "red" : "#fff",
                                    }}
                                  />
                                }
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{
                                  color: expanded === "panel1" ? "red" : "#fff",
                                  padding:
                                    expanded === "panel1"
                                      ? "5px 20px"
                                      : "10px 20px",
                                }}
                                className={`${
                                  expanded === "panel1" && "child-min"
                                }`}
                              >
                                <Typography>How does it work?</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography className="child-summary">
                                  A travel agency helps customers plan trips by
                                  booking flights, hotels, tours, and providing
                                  travel-related services.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion
                              expanded={expanded === "panel2"}
                              onChange={handleChange("panel2")}
                              style={{ color: "#fff" }}
                              className="main-accordion"
                            >
                              <AccordionSummary
                                expandIcon={
                                  <ExpandMoreIcon
                                    style={{
                                      color:
                                        expanded === "panel2" ? "red" : "#fff",
                                    }}
                                  />
                                }
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                sx={{
                                  color: expanded === "panel2" ? "red" : "#fff",
                                  padding:
                                    expanded === "panel2"
                                      ? "5px 20px"
                                      : "10px 20px",
                                }}
                                className={`${
                                  expanded === "panel2" && "child-min"
                                }`}
                              >
                                <Typography>
                                  How can Travosy improve my travel agency’s
                                  efficiency?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography className="child-summary">
                                  Travosy automates booking, payment, and
                                  itinerary management, saving time and reducing
                                  manual tasks.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion
                              expanded={expanded === "panel3"}
                              onChange={handleChange("panel3")}
                              style={{ color: "#fff" }}
                              className="main-accordion"
                            >
                              <AccordionSummary
                                expandIcon={
                                  <ExpandMoreIcon
                                    style={{
                                      color:
                                        expanded === "panel3" ? "red" : "#fff",
                                    }}
                                  />
                                }
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                                sx={{
                                  color: expanded === "panel3" ? "red" : "#fff",
                                  padding:
                                    expanded === "panel3"
                                      ? "5px 20px"
                                      : "10px 20px",
                                }}
                                className={`${
                                  expanded === "panel3" && "child-min"
                                }`}
                              >
                                <Typography>
                                  Does Travosy integrate with popular booking
                                  platforms?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography className="child-summary">
                                  Yes, Travosy integrates with major booking
                                  platforms for flights, hotels, and car
                                  rentals.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion
                              expanded={expanded === "panel4"}
                              onChange={handleChange("panel4")}
                              style={{ color: "#fff" }}
                              className="main-accordion"
                            >
                              <AccordionSummary
                                expandIcon={
                                  <ExpandMoreIcon
                                    style={{
                                      color:
                                        expanded === "panel4" ? "red" : "#fff",
                                    }}
                                  />
                                }
                                aria-controls="panel4a-content"
                                id="panel4a-header"
                                sx={{
                                  color: expanded === "panel4" ? "red" : "#fff",
                                  padding:
                                    expanded === "panel4"
                                      ? "5px 20px"
                                      : "10px 20px",
                                }}
                                className={`${
                                  expanded === "panel4" && "child-min"
                                }`}
                              >
                                <Typography>
                                  What level of customization does Travosy offer
                                  for branding?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography className="child-summary">
                                  Travosy offers customizable templates for
                                  branding, allowing you to add logos, colors,
                                  and unique designs.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion
                              expanded={expanded === "panel5"}
                              onChange={handleChange("panel5")}
                              style={{ color: "#fff" }}
                              className="main-accordion"
                            >
                              <AccordionSummary
                                expandIcon={
                                  <ExpandMoreIcon
                                    style={{
                                      color:
                                        expanded === "panel5" ? "red" : "#fff",
                                    }}
                                  />
                                }
                                aria-controls="panel5a-content"
                                id="panel5a-header"
                                sx={{
                                  color: expanded === "panel5" ? "red" : "#fff",
                                  padding:
                                    expanded === "panel5"
                                      ? "5px 20px"
                                      : "10px 20px",
                                }}
                                className={`${
                                  expanded === "panel5" && "child-min"
                                }`}
                              >
                                <Typography>
                                  Can Travosy handle multi-city travel
                                  itineraries?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography className="child-summary">
                                  Yes, Travosy supports multi-city travel plans,
                                  allowing easy management of complex
                                  itineraries.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="mb-3 mt-3">Leave A Comment:</h5>
                        <div className="row main-form-div">
                          <div className="col-12 col-sm-6">
                            <label htmlFor="name">Your Name:</label> <br />
                            <input
                              type="text"
                              placeholder="Name :"
                              id="name"
                              name="name"
                              className="w-100"
                              value={formData.name}
                              onChange={(e) => handleChangeData(e)}
                            />
                          </div>
                          <div className="col-12 col-sm-6">
                            <label htmlFor="email">Your Email:</label>
                            <br />
                            <input
                              type="text"
                              placeholder="Your Email :"
                              id="email"
                              name="email"
                              className="w-100"
                              value={formData.email}
                              onChange={(e) => handleChangeData(e)}
                            />
                          </div>
                          <div className="col-12">
                            <label htmlFor="comment" className="mb-3 mt-2">
                              Your Comment :
                            </label>
                            <br />
                            <textarea
                              type="text"
                              placeholder="Message :"
                              id="comment"
                              name="comment"
                              className="w-100"
                              value={formData.comment}
                              onChange={(e) => handleChangeData(e)}
                              rows={3}
                            />
                          </div>
                          <div>
                            <button
                              className="rounded-2 bg-danger border-0 text-white w-100 p-2 mt-2"
                              onClick={handleSubmitData}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-12 col-lg-4"
                  style={{ position: "sticky", top: "0", alignSelf: "start" }}
                >
                  <div className="tour-search-main">
                    <div className="row position-relative date-div">
                      <div className="col-12 mt-2">
                        <label htmlFor="date" className="mb-2">
                          Date:
                        </label>
                        <br />
                        <input
                          type="date"
                          id="date"
                          className="w-100"
                          name="date"
                          value={applyForm.date}
                          onChange={(e) => handleApplyForm(e)}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="row align-items-center">
                        <div className="col-12 col-sm-3 mb-2">
                          <label htmlFor="adult">Adult:</label>
                        </div>
                        <div className="col-12 col-sm-9 position-relative">
                          <BsPeopleFill className="icon" />
                          <input
                            type="number"
                            id="adult"
                            placeholder="No. of person"
                            name="adult"
                            value={applyForm.adult}
                            onChange={(e) => handleApplyForm(e)}
                          />
                        </div>
                      </div>
                      <div className="row align-items-center mt-2">
                        <div className="col-12 col-sm-3 mb-2">
                          <label htmlFor="adult">Children:</label>
                        </div>
                        <div className="col-12 col-sm-9 position-relative">
                          <BsPeopleFill className="icon" />
                          <input
                            type="number"
                            id="children"
                            placeholder="No. of children"
                            name="children"
                            value={applyForm.children}
                            onChange={(e) => handleApplyForm(e)}
                          />
                        </div>
                        <div className="w-100">
                          <button
                            className="rounded-2 bg-danger border-0 text-white w-100 p-2 mt-3"
                            onClick={handleSubmitApplyform}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="ms-1 mt-3">Tour Map</h5>
                      <div className="map-main mt-5 mb-5">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387194.0622732494!2d-74.30932777004287!3d40.697019286161634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1727191074570!5m2!1sen!2sin"
                          width="100%"
                          height="100%"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="map-iframe"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images.map((image) => ({
          src: image,
        }))}
        index={currentIndex}
        onSlideChange={(index) => setCurrentIndex(index)}
      />
    </div>
  );
}

export default PlaceList;
