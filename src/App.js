import React from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import Bookshelf from "./Bookshelf";
import Search from "./Search";

class BooksApp extends React.Component {
  state = {
    books: [], // an array of book objects
  };

  // Initial load of all books from the database
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  // Move this book to the new shelf by updating the book.shelf field
  moveBook = (newShelf, book) => {
    BooksAPI.update(book, newShelf).then((response) => {
      book.shelf = newShelf;
      this.setState((prevState) => ({
        books: prevState.books.filter((b) => b.id !== book.id).concat(book),
      }));
    });
  };

  render() {
    const shelfs = {
      currentlyReading: "Currently Reading",
      wantToRead: "Want to Read",
      read: "Read",
    };

    return (
      <div className='app'>
        <Route
          exact
          path='/'
          render={() => (
            <div className='list-books'>
              <div className='list-books-title'>
                <h1>MyReads</h1>
              </div>
              <div className='list-books-content'>
                <div>
                  {Object.entries(shelfs).map(([name, title]) => (
                    <Bookshelf
                      key={name}
                      shelfTitle={title}
                      bookList={this.state.books.filter(
                        (b) => b.shelf === name
                      )}
                      moveBook={this.moveBook}
                    />
                  ))}
                </div>
              </div>
              <div className='open-search'>
                <Link to='/search'>
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          )}
        />

        <Route
          exact
          path='/search'
          render={({ history }) => (
            <Search
              handleNavigation={() => {
                history.push("/");
              }}
              moveBook={this.moveBook}
              booksOnAShelf={this.state.books}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
