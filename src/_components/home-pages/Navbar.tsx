import { useState } from "react";
import "./navbar.css";
import { AiFillBell, AiFillQuestionCircle, AiFillHeart } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);

  return (
    <>
      <span className="side-rectangle"></span>

      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <span>
            BOOK
            <br />
            FISH
          </span>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
        >
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/nearby">Nearby</Link>
            </li>
            <li>
              <Link to="/bookshelf">Book Shelf</Link>
            </li>
          </ul>
        </div>

        {/* 3rd user info */}
        <div className="user-info">
          <ul className="user-info-desktop">
            <li>
              <a href="#">
                <AiFillQuestionCircle className="profile-pic" />
              </a>
            </li>
            <li>
              <a href="#">
                <AiFillHeart className="heart-icon" />
              </a>
            </li>
            <li>
              <a href="#">
                <FaComments className="comments" />
              </a>
            </li>
            <li>
              <a href="#">
                <AiFillBell className="bell-icon" />
              </a>
            </li>
          </ul>

          {/* hamburget menu start  */}
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu className="ham-icon" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
