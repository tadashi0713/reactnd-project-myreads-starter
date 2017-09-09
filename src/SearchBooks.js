import React, { Component } from 'react'
import { Link } from  'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  static propTypes = {
    searchedBooks: PropTypes.array.isRequired,
    searchQuery: PropTypes.string.isRequired,
    onUpdateSearchQuery: PropTypes.func.isRequired
  };

  state = {
    query: '',
    searchedBooks: []
  }

  updateQuery = (query) => {
    this.setState({ query })
    if (query !== '') {
      BooksAPI.search(query, 20).then((results) => {
        if (typeof results === 'undefined' || results.error) return;
        this.setState({ searchedBooks: results })
      })
    }
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
  }

  render() {
    const { query, searchedBooks } = this.state;
    const { searchQuery, onUpdateSearchQuery } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchQuery}
              onChange={(event) => onUpdateSearchQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchedBooks.map((book) => (
              <Book book={book} key={book.id} onUpdateBook={this.updateBook}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
