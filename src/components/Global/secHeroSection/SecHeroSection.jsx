import { useEffect, useState } from "react";
import "./SecHeroSection.scss";

import { Link } from "react-router-dom";

function SecHeroSection({ imageData }) {
  const [sigleData, getsigleData] = useState();
  useEffect(() => {
    if (imageData) {
      getsigleData(imageData);
    }
  }, [imageData]);
  return (
    <div className="hero-container">
      <div className="background-image"></div>
      <div className="hero-content">
        <h1>{sigleData?.name || "Tour Packages"}</h1>
        <p>
          <Link className="padSpan grey" to={"/"}>
            TRAVOSY
          </Link>{" "}
          <span style={{ padding: "5px" }}>{">"}</span>
          TOUR
        </p>
      </div>
    </div>
  );
}

export default SecHeroSection;
