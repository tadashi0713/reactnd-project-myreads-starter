import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    listBooks: PropTypes.array,
    onUpdateBook: PropTypes.func.isRequired
  };

  render() {
    const { book, listBooks, onUpdateBook } = this.props

    let bookShelf = 'none'
    if (book.shelf) {
      bookShelf = book.shelf
    } else if (listBooks) {
      const matchBook = listBooks.filter((listBook) => {return listBook.id === book.id})[0]
      if (typeof matchBook !== 'undefined') {
        bookShelf = matchBook.shelf
      }
    }

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks.smallThumbnail})` }} />
            <div className="book-shelf-changer">
              <select
                value={bookShelf}
                onChange={(e) => { onUpdateBook(book, e.target.value) }}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">
            {book.title}
            </div>
          <div className="book-authors">
            {book.authors ? book.authors.join(', '): ''}
            </div>
        </div>
      </li>
    )
  }
}

export default Book
