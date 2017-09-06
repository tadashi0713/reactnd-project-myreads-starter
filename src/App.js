import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    listBooks: []
  };

  render() {
    const { listBooks } = this.state

    return (
      <div className="app">
        <Route path="/search" component={SearchBooks}/>
        <Route exact path="/" component={() => <ListBooks listBooks={listBooks}/>}/>
      </div>
    )
  }
}

export default BooksApp
