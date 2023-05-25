import "../Header/header.css";
import {ReactNavbar} from "overlay-navbar";
import {FaUserAlt} from "react-icons/fa"
import {FaSearch } from "react-icons/fa";
import {FaShoppingCart } from "react-icons/fa";
//import "overlay-navbar/ReactNavbar.min.css";

export default function App() {
  return (
      <ReactNavbar
        logo="https://www.lunapic.com/editor/premade/transparent.gif"
        burgerColor="crimson"
        navColor1="#fff5f5"
        burgerColorHover="#900"
        logoWidth="50%"
        logoHoverColor="crimson"
        link1Size="1.2rem"
        link1Color="#121212"
        link1Padding="1vmax"
        link1ColorHover="crimson"
        nav2justifyContent="flex-end"
        link1Margin="1vmax"
        link2Margin="0"
        link3Margin="0"
        link4Margin="1vmax"
        nav3justifyContent="flex-start"
        link1Text="Home"
        link1Family="sans-serif"
        link2Text="Products"
        link3Text="About Us"
        link4Text="Contact Us"
        nav4justifyContent="flex-start"
        profileIcon={true}
        ProfileIconElement={FaUserAlt}
        searchIcon={true}
        SearchIconElement={FaSearch}
        cartIcon={true}
        CartIconElement={FaShoppingCart}
        searchIconMargin="0.5vmax"
        cartIconMargin="1vmax"
        profileIconMargin="0.5vmax"
        searchIconColor="#121212"
        cartIconColor="#121212"
        profileIconColor="#121212"
        searchIconColorHover="crimson"
        cartIconColorHover="crimson"
        profileIconColorHover="crimson"
      />
  );
}
