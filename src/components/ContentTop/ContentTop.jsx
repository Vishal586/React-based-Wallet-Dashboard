import { iconsImgs } from "../../utils/images";
import "./ContentTop.css";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import ThemeToggle from "../Themetoggle/ThemeToggle.jsx"; // Adjust the import path as needed

const ContentTop = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  return (
    <div className="main-content-top">
      <div className="content-top-left">
        <button
          type="button"
          className="sidebar-toggler"
          onClick={() => toggleSidebar()}
        >
          <img src={iconsImgs.menu} alt="" />
        </button>
        <h3 className="content-top-title">Home</h3>
      </div>
      <div className="content-top-btns">
        <button type="button" className="search-btn content-top-btn">
          <img src={iconsImgs.search} alt="" />
        </button>
        <button className="notification-btn content-top-btn">
          <img src={iconsImgs.bell} alt="" />
          <span className="notification-btn-dot"></span>
        </button>
        {/* Add ThemeToggle here */}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default ContentTop;