import React, { Component } from "react";
import PropTypes from "prop-types";

class ShelfChangerMenu extends Component {
  static propTypes = {
    shelf: PropTypes.string.isRequired,
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired,
  };

  handleShelfChange = (e) =>
    this.props.moveBook(this.props.book, e.target.value);

  render() {
    const shelfs = {
      currentlyReading: "Currently Reading",
      wantToRead: "Want to Read",
      read: "Read",
      none: "None",
    };
    return (
      <div className='book-shelf-changer'>
        <select
          defaultValue={
            this.props.shelf === undefined ? "none" : this.props.shelf
          }
          onChange={(event) =>
            this.props.moveBook(event.target.value, this.props.book)
          }
        >
          <option value='move' disabled>
            Move to...
          </option>
          {Object.entries(shelfs).map(([name, title]) => (
            <option key={name} value={name} name={name}>
              {title}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default ShelfChangerMenu;
