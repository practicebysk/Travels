import { useState, useRef, useEffect } from "react";
import "./SliderComponent.scss";
import { getPlace } from "../../service/API";

const SliderComponent = () => {
  const scrollRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const prevImage = () => {
    scrollRef.current.scrollLeft -= 200;
  };

  const nextImage = () => {
    scrollRef.current.scrollLeft += 200;
  };

  useEffect(() => {
    const fetchSliderPlace = async () => {
      try {
        const data = await getPlace("sliderplace");
        setImages(data.splice(0, 8));
      } catch (error) {
        console.error("Failed to fetch places:", error);
      }
    };

    fetchSliderPlace();
  }, []);

  return (
    <div
      className="mt-5 mb-5 text-white justify-content-center d-flex"
    >
      <div style={{ width: "80%" }}>
        <div className="d-flex mb-5 justify-content-center">
          <div className="text-center">
            <h3>Top Destinations</h3>
            <p className="pa">
              Planning for a trip? We will organize your trip with the best
              places and within <br /> best budget!
            </p>
          </div>
        </div>
        <div className="slider-wrapper">
          <button className="prev-btn" onClick={prevImage}>
            ❮
          </button>

          <div
            className="slider-container"
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {images?.map((imgs, index) => (
              <div
                className="slider-item"
                key={index}
                style={{ marginRight: index === 7 ? "0px" : "" }}
              >
                <img
                  src={imgs.img}
                  alt="Slide Image"
                  className="slider-image"
                />
                <div className="slider-text">
                  <span>
                    {imgs.text}
                    <br />
                    <span style={{ fontSize: "13px" }}>
                      {imgs.hotel} Hotels
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="next-btn" onClick={nextImage}>
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default SliderComponent;
