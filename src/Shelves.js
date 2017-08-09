import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MoveBook from './MoveBook'
import PropTypes from 'prop-types'

//component for main page of web app. works with displaybooks.js to render 3 shelf sections with books categorized as selected
class Shelves extends Component {

	  static propTypes = {
      books: PropTypes.array.isRequired,
      onMoveBook: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired
    }


	render(){
		const {title, books, onMoveBook} = this.props

		return(
        		<div className="bookshelf">
          			<h2 className="bookshelf-title">{title}</h2>
          			<div className="bookshelf-books">
            			<ol className="books-grid">
            				{books.map((book)=> (
              					<li key={book.id}>
                					<div className="book">
                  						<div className="book-top">
                    						<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})` }}></div>
                    					<MoveBook shelf={book.shelf} newShelf={(e)=>onMoveBook(e,book)}/>
                              </div>
                  						<div className="book-title">{book.title}</div>
                  						<div className="book-authors">{book.authors ? book.authors.join(', '): ""}</div>
                					</div>
              					</li>
              				))}
      					</ol>
          			</div>

            <div className="open-search">
            	<Link to="/search">Add a Book</Link>
            </div>
          	</div>

		)
	}
}

export default Shelves
