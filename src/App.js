import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    listBooks: [],
    searchedBooks: [],
    searchQuery: '',
  };

  fetchBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ listBooks: books })
    })
  }

  updateSearchQuery = (query) => {
    this.setState({searchQuery: query})
    if (query !== '') {
      BooksAPI.search(query, 20).then((results) => {
        if (typeof results === 'undefined' || results.error) return;
        this.setState({ searchedBooks: results })
      })
    }
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({ listBooks: books })
      })
    })
  }

  render() {
    const { listBooks, searchedBooks, searchQuery } = this.state

    return (
      <div className="app">
        <Route path="/search" component={() =>
          <SearchBooks
            searchedBooks={searchedBooks}
            searchQuery={searchQuery}
            onUpdateSearchQuery={this.updateSearchQuery}
            onUpdateBook={this.updateBook}
          />
        }/>
        <Route exact path="/" component={() =>
          <ListBooks
            listBooks={listBooks}
            onFetchBooks={this.fetchBooks}
            onUpdateBook={this.updateBook}
          />
        }/>
      </div>
    )
  }
}

export default BooksApp
