import React from 'react'
import PropTypes from 'prop-types'

//component for moving books from one section to another
const MoveBook = (props) => (

		<div className="book-shelf-changer">
            <select value={props.shelf} onChange={props.newShelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
)

MoveBook.propTypes = {
    shelf: PropTypes.string.isRequired,
    newShelf: PropTypes.func.isRequired,
    }

export default MoveBook