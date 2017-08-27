import React, { Component } from 'react'
import { Link } from  'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class ListBooks extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(book => {
      this.setState(state => ({
        books: state.books.concat([ book ])
      }))
    })
  };

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
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReadingBooks.map((book) => (
                    <Book
                      book={book}
                      key={book.title}
                      onUpdateBook={this.updateBook}
                    />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToReadBooks.map((book) => (
                    <Book
                      book={book}
                      key={book.title}
                      onUpdateBook={this.updateBook}
                    />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {readBooks.map((book) => (
                    <Book
                      book={book}
                      key={book.title}
                      onUpdateBook={this.updateBook}
                    />
                  ))}
                </ol>
              </div>
            </div>
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
