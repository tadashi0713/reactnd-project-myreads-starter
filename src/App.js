import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    listBooks: [],
    searchedBooks: [],
    searchQuery: '',
  };

  render() {
    const { listBooks, searchedBooks, searchQuery } = this.state

    return (
      <div className="app">
        <Route path="/search" component={() => <SearchBooks searchedBooks={searchedBooks} searchQuery={searchQuery}/>}/>
        <Route exact path="/" component={() => <ListBooks listBooks={listBooks}/>}/>
      </div>
    )
  }
}

export default BooksApp
