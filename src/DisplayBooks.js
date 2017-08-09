import React, { Component } from 'react'
import Shelves from './Shelves'
import './App.css'
import PropTypes from 'prop-types'

//component for main page of web app. works with shelves.js to render 3 shelf sections with books categorized as selected
class DisplayBooks extends Component {

    static propTypes = {
    	books: PropTypes.array.isRequired,
    	onMoveBook: PropTypes.func.isRequired,
    }

	render() {
		const { books, onMoveBook } = this.props

		const shelves = {
			currentlyReading: 'Currently Reading',
			wantToRead: 'Want to Read',
			read: 'Read'
		}

		return (
			<div className="list-books">
            	<div className="list-books-title">
              		<h1>MyReads</h1>
            	</div>
            	{Object.keys(shelves).map((bookShelf)=> {
            		return <Shelves title={shelves[bookShelf]} books={books.filter((book)=>book.shelf === bookShelf)} onMoveBook={onMoveBook} key={bookShelf}/>
            	})}
            </div>
		)
	}
}

export default DisplayBooks