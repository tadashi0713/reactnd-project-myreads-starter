import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route path="/search" render={({ history }) => (
          <SearchBooks history={ history }/>
        )}/>
        <Route exact path="/" render={() => (
          <ListBooks/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
