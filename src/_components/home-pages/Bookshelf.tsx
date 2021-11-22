import "./bookshelf.css";
import { BsBook } from "react-icons/bs";
import { GoPlus } from "react-icons/go"
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import styleClasses from "../css/Home.module.css";

const Bookshelf = () => {
    return (
        <div className={styleClasses.MainDiv}>
            <Navbar />
            <div className="center-book">
                <BsBook className="book-outline" />
                <p className="bookshelf">Book Shelf</p>
                <p className="info">Add books in this section to start exchanging them.</p>
                <Link to="/add">
                    <button type="button" className="btn1">
                        <span className="text-btn1">Add Books</span>
                        <GoPlus className="plus-sign1" />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Bookshelf;