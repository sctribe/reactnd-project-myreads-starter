import React, { Component } from 'react'
import Book from './Book'
import './App.css'

class DisplayBooks extends Component {
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
            	{Object.keys(shelves).map((shelfKey)=> {
            		return <Book title={shelves[shelfKey]} books={books.filter(book)=>book.shelf === shelfKey} onMoveBook={onMoveBook} key={shelfKey}/>
            	})}
            </div>
		)
	}
}

export default DisplayBooks