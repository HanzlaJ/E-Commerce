import React from "react";
import playstore from "../../../images/playstore.png";
import Appstore from "../../../images/Appstore.png";
import "./footer.css";
import { SocialIcon } from "react-social-icons";

function Footer() {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playstore} alt="playstore"></img>
        <img src={Appstore} alt="Appstore"></img>
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>
        <p>Copyright 2023 @ MeHanzlaJaffar</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>

        <div className="icons">
          <SocialIcon
            url="https://www.instagram.com/rhanzla/" target="_blank"
          ></SocialIcon>
        </div>

        <div className="icons"> 
        <SocialIcon
            url="https://www.facebook.com/rana.hanzla.714" target="_blank"
          ></SocialIcon>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
