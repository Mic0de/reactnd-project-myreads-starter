import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      booksFound: [],
    };
  }

  static propTypes = {
    handleNavigation: PropTypes.func.isRequired,
    moveBook: PropTypes.func.isRequired,
    booksOnAShelf: PropTypes.array.isRequired,
  };

  handleInputChange = (query) => {
    this.setState((prevState) => ({
      query: query,
    }));

    this.searchForABook(query);
  };

  clearQUeryAndResults = () => {
    this.setState(() => ({
      query: "",
      booksFound: [],
    }));
  };

  searchForABook = (query) => {
    if (query.trim() !== "") {
      BooksAPI.search(query.trim()).then((booksFound) => {
        // check if a book already on the shelf is returned in the results then update it's current shelf field
        booksFound.forEach((bf) => {
          this.props.booksOnAShelf.forEach((bookOnAShelf) => {
            if (bookOnAShelf.id === bf.id) {
              bf.shelf = bookOnAShelf.shelf;
            }
          });
        });

        this.setState(() => ({
          booksFound,
        }));
      });
    } else {
      this.setState({ booksFound: [] });
    }
  };

  render() {
    const { query } = this.state;

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/'>
            <button className='close-search'>Close</button>
          </Link>
          <div className='search-books-input-wrapper'>
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              autoFocus
              type='text'
              placeholder='Search by title or author'
              value={query}
              onChange={(event) => this.handleInputChange(event.target.value)}
            />
          </div>
        </div>

        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.state.query &&
            Array.isArray(this.state.booksFound) &&
            this.state.booksFound.length ? (
              this.state.booksFound.map((b) => (
                <Book book={b} key={b.id} moveBook={this.props.moveBook} />
              ))
            ) : (
              <div>
                <p>
                  No results to show
                  {this.state.query.trim()
                    ? " for term ".concat(this.state.query)
                    : ""}
                </p>
              </div>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
