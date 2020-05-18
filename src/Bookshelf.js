import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

function Bookshelf(props) {
  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{props.shelfTitle}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid' key={props.shelfTitle}>
          {props.bookList.map((b) => (
            <Book book={b} key={b.id} moveBook={props.moveBook} />
          ))}
        </ol>
      </div>
    </div>
  );
}

Bookshelf.propTypes = {
  shelfTitle: PropTypes.string.isRequired,
  bookList: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired,
};

export default Bookshelf;
