import React, { Component } from 'react'
import { Link } from  'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class ListBooks extends Component {
  static propTypes = {
    listBooks: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  };

  render() {
    const { listBooks, onUpdateBook } = this.props;

    const currentlyReadingBooks = listBooks.filter((book) => {
      return book.shelf === 'currentlyReading'
    });

    const wantToReadBooks = listBooks.filter((book) => {
      return book.shelf === 'wantToRead'
    });

    const readBooks = listBooks.filter((book) => {
      return book.shelf === 'read'
    });

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title='Currently Reading'
              books={currentlyReadingBooks}
              onUpdateBook={onUpdateBook}
            />
            <BookShelf
              title='Want to Read'
              books={wantToReadBooks}
              onUpdateBook={onUpdateBook}
            />
            <BookShelf
              title='Read'
              books={readBooks}
              onUpdateBook={onUpdateBook}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
