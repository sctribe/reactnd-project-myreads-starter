import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MoveBook from './MoveBook'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

//search page component
class SearchPage extends Component {

    static propTypes = {
    	books: PropTypes.array.isRequired,
    	onMoveBook: PropTypes.func.isRequired,
    }


	state = {
		query:'',
		resultBooks:[]
	}

	bookOnShelf = (books, book) => {
		for (let bookInSearch of books){
			if(book.id === bookInSearch.id) {
				return bookInSearch.shelf
			}
		}
		return "none"
	}

	//match which shelf the book is on on the front and search pages
	MatchStateInSearch = (resultBooks, books) => {
		const result= resultBooks.map((book)=> {
			const searchedBook = book
			searchedBook.shelf = this.bookOnShelf(books,book)
			return searchedBook
		})
		this.setState({resultBooks: result})
	}

	//update search results. Only 20 results are shown per API documentation
	updateQuery = (query) => {
        this.setState({ query: query.trim() })
		if(query){
            BooksAPI.search(query).then((resultBooks) => this.MatchStateInSearch(resultBooks, this.props.books))
		}
    }


    moveToNewShelf = (e, book) => {
        this.props.onMoveBook(e, book)
        BooksAPI.update(book, e.target.value).then((res) => {
            BooksAPI.getAll().then((books) => {
                this.MatchStateInSearch(this.state.resultBooks, books)
            })
        })
    }

	render(){
		const { resultBooks, query } = this.state

		return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">

                <input type="text" placeholder="Search by title or author" value={query} onChange={e=>this.updateQuery(e.target.value)}/>

              </div>
            </div>
            if(resultBooks){
            <div className="search-books-results">
             <ol className="books-grid">
            				{resultBooks.map((book)=> (
              					<li key={book.id}>
                					<div className="book">
                  						<div className="book-top">
                    						<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})` }}></div>
                    					<MoveBook shelf={book.shelf} newShelf={(e)=>this.moveToNewShelf(e,book)}/>
                              			</div>
                  						<div className="book-title">{book.title}</div>
                  						<div className="book-authors">{book.authors ? book.authors.join(', '): ""}</div>
                					</div>
              					</li>
              				))}
      					</ol>
          			</div>
            	}
          </div>


			)
	}
}

export default SearchPage



