import React, { Component } from 'react'
import { Link } from  'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class ListBooks extends Component {
  static propTypes = {
    listBooks: PropTypes.array.isRequired,
  };

  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
    })
  }

  render() {
    const { books } = this.state;

    const currentlyReadingBooks = books.filter((book) => {
      return book.shelf === 'currentlyReading'
    });

    const wantToReadBooks = books.filter((book) => {
      return book.shelf === 'wantToRead'
    });

    const readBooks = books.filter((book) => {
      return book.shelf === 'read'
    });

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf title='Currently Reading' books={currentlyReadingBooks} onUpdateBook={this.updateBook}/>
            <BookShelf title='Want to Read' books={wantToReadBooks} onUpdateBook={this.updateBook}/>
            <BookShelf title='Read' books={readBooks} onUpdateBook={this.updateBook}/>
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
