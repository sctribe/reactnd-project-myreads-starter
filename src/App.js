import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import DisplayBooks from './DisplayBooks'
import SearchPage from './SearchPage'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  moveBook = (e, book) => {
    BooksAPI.update(book, e.target.value).then((result) => {
      BooksAPI.getAll().then((books) => {
        this.setState({books})
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <DisplayBooks books={this.state.books} onMoveBook={this.moveBook}/>
        )}/>
        <Route exact path="/search" render={({history}) => (
          <SearchPage books={this.state.books} onMoveBook={this.moveBook}/>
        )}/>
      </div>

    )
  }
}

export default BooksApp
