import Navbar from "./Navbar";
import { useState } from "react";
import "./bookshelf.css";
import BookCard from "./BookCard";
import styleClasses from "../css/Home.module.css";
import axios from 'axios';
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go"
import { BsSearch } from "react-icons/bs"
import { IoChevronBackOutline, IoCheckmarkSharp } from "react-icons/io5";

const AddBook = () => {
    interface bookInfo {
        imgLink: string;
        title: string;
        authors: any;
    }
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState<Array<bookInfo>>([]);
    const handleSubmit = () => {
        setLoading(true);
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`)
            .then(res => {
                const len: number = res.data.items.length;
                setCards(cards => []);
                if (len > 0) {
                    setLoading(false);
                    var br:number = 0;
                    res["data"]["items"].map((item: any) => {
                        // console.log(item.volumeInfo);
                        if (item.volumeInfo.imageLinks && br<8) {
                            br=br+1;
                            const x: bookInfo = {
                                imgLink: item.volumeInfo.imageLinks.thumbnail,
                                title: item.volumeInfo.title,
                                authors: item.volumeInfo.authors,
                            }
                            setCards(cards => [...cards, x]);
                        }
                    });
                }
            })
            .catch(err => {
                setLoading(true);
                console.log(err.response);
                alert('error');
            });
    };
    const handleCards = () => {
        const items = cards.map((item, i) => {
            return (
                <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4 ps-0' key={i}>
                    <BookCard
                        thumbnail={item.imgLink}
                        title={item.title}
                        authors={item.authors}
                    />
                </div>
            );
        });

        return (
            <div style={{ position: 'absolute', top: '270px', left: '340px', width: '900px' }}>
                <div className='row'>{items}</div>
            </div>
        );

    };

    return (
        <div className={styleClasses.MainDiv}>
            <Navbar />
            <div className="center-book">
                <Link to="/bookshelf">
                    <button type="button" className="btn2">
                        <IoChevronBackOutline className="back-sign" />
                        <span className="text-btn1">Cancel</span>
                    </button>
                </Link>
            </div>
            <div className="center-book-right">
                <Link to="/bookshelf">
                    <button type="button" className="btn3">
                        <span className="text-btn1">Done</span>
                        <IoCheckmarkSharp className="tick-sign" />
                    </button>
                </Link>
            </div>
            <div className="center-add">
                <GoPlus className="plus-sign2" />
                <p className="add-books">Add Books</p>
                <p className="add-info">Search for books & add them to your shelf</p>
            </div>
            <div className="input-icons">
                <i className="search-icon"><BsSearch />
                </i>
                <input className="input-field"
                    type="text"
                    placeholder="Search for books to add..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyPress={(event) => { if (event.key === 'Enter') handleSubmit() }}></input>
            </div>
            {handleCards()}
        </div>
    )
}

export default AddBook
