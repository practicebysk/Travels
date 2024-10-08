import { useEffect, useRef, useState } from "react";
import HeroImage from "../Global/heroImage/HeroImage";
import Topbar from "../Global/Topbar/Topbar";
import SliderComponent from "../Global/View/SliderComponent";
import Mainpart from "../Global/Mainpart/Mainpart";
import AboutCompany from "../Global/aboutCompany/AboutCompany";

function Mainpage() {
  return (
    <div>
      <Topbar />
      <HeroImage  />
      <SliderComponent />
      <Mainpart />
      <AboutCompany />
    </div>
  );
}

export default Mainpage;
