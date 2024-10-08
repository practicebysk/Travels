import "./Topbar.scss";
// icon
import { MdOutlineWatchLater } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";

import { MdOutlineMail } from "react-icons/md";
import { SlSocialFacebook } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";

function Topbar() {
  return (
    <div className="container-fluid bg-col-topbar topBar-show-hide">
      <div className="row p-3  text-center top-bar-text-size">
        <div className="col-6">
          <span className="text-danger h6">
            <MdOutlineWatchLater />
          </span>
          <span className="p-2">Mon-Sat: 9am to 6pm</span>
          <span className="text-danger h6">
            <SlLocationPin />
          </span>
          <span className="p-2">Houston, USA 485</span>
        </div>
        <div className="col-6">
          <span className="text-danger h6">
            <MdOutlineMail />
          </span>
          <span className="p-2">contact@example.com</span>
          <span className="p-2 h6">
            <SlSocialFacebook />
          </span>
          <span className="h6">
            <FaInstagram />
          </span>
          {/* <span className="p-2 h6">
            <CiTwitter />
          </span> */}
          <span className="ps-2 h6">
            <IoCallOutline />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
