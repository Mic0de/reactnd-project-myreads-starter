import React from "react";
import RubberBand from "react-reveal/RubberBand";
import Flip from "react-reveal/Flip";
import Slide from "react-reveal/Slide";
import PropTypes from "prop-types";
import ShelfChangerMenu from "./ShelfChangerMenu";


function Book(props) {
  const book = props.book;
  return (
    <Slide right>
      <RubberBand>
        <Flip right>
          <li key={book.id}>
            <div className='book'>
              <div className='book-top'>
                <div
                  className='book-cover'
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${
                      book.imageLinks === undefined
                        ? ""
                        : book.imageLinks.smallThumbnail
                    })`,
                  }}
                />
                <ShelfChangerMenu
                  shelf={book.shelf === undefined ? "none" : book.shelf}
                  book={book}
                  moveBook={props.moveBook}
                />
              </div>
              <div className='book-title'>
                {book.title === undefined ? "No title available" : book.title}
              </div>
              {book.authors !== undefined
                ? book.authors.map((a) => (
                    <div className='book-authors' key={a}>
                      {a}
                    </div>
                  ))
                : "No authors available"}
            </div>
          </li>
        </Flip>
      </RubberBand>
    </Slide>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  moveBook: PropTypes.func.isRequired,
};

export default Book;
