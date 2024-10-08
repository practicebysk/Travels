import { useEffect, useState } from "react";
import "./Mainpart.scss";
import { Link, useNavigate } from "react-router-dom";

// icon
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";

// rating
import StarRatings from "react-star-ratings";
import { getPlace } from "../../service/API";

function Mainpart() {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const likePacked = (index) => {
    images.forEach((img, i) => {
      if (i === index) {
        img.liked = !img.liked;
      } else {
        img.liked = false;
      }
    });
    setImages([...images]);
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await getPlace("place");
        setImages(data.splice(0, 6));
      } catch (error) {
        console.error("Failed to fetch places:", error);
      }
    };

    fetchPlaces();
  }, []);
  return (
    <div className="mt-5 mb-5 text-white justify-content-center d-flex">
      <div style={{ width: "80%" }}>
        <div className="d-flex mb-5 justify-content-center">
          <div className="text-center">
            <h3>Tours Packages</h3>
            <p className="pa">
              Planning for a trip? We will organize your trip with the best
              places and within
              <br /> best budget!
            </p>
          </div>
        </div>
        <div className="container-fluid my-4 p-0">
          <div className="row">
            {images.map((imgs, i) => (
              <div className="col-12 col-sm-6 col-xl-4 mb-4" key={i}>
                <div className="card card-bg" style={{ position: "relative" }}>
                  <div className="image-container">
                    <img src={imgs.img} className="card-img-top" alt="Card" />
                    <div className="discount-badge">{imgs.discount}% Off</div>
                    <div
                      className="like-button-overlay"
                      onClick={() => likePacked(i)}
                    >
                      {imgs.liked ? <FaHeart color="red" /> : <CiHeart />}
                    </div>
                  </div>
                  <div className="card-body pb-1">
                    <div className="d-flex">
                      <span className="card-title">
                        <IoLocationOutline /> {imgs.location}
                      </span>
                    </div>
                    <span className="card-text">{imgs.name}</span>
                    <div className="d-flex mt-2">
                      <span style={{ color: "#ffffff80", fontSize: "15px" }}>
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
                        <Link
                          className="text-decoration-none text-white"
                          to={`/place?id=${imgs.id}`}
                        >
                          Explore Now <FaLongArrowAltRight />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="text-center grey hover-text-red"
            onClick={() => navigate("/place")}
          >
            See More Tours <FaLongArrowAltRight />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpart;
