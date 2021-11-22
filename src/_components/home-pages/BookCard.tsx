import React from 'react'
import "./BookCard.css";

interface bookProps {
    thumbnail: string,
    title: string,
    authors: any,
}
const BookCard: React.FC<bookProps> = ({ thumbnail, title, authors }) => {
    return (
        <div className="row main-card" style={{ marginLeft: '15px' }}>
            <div className="col-md-4">
                <img src={thumbnail} className="img-shape" alt={title} />
            </div>
            <div className="col-md-8">
                <div className="img-text">{title}</div>
                <div className="author-text">{authors[0]}</div>
                <div className="add-btn-pos">
                    <button type="button" className="btn-addbook">
                        <span className="text-addbook">Add to shelf</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookCard
