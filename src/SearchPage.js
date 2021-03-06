import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {

  state = {
    bookQueryResults: [],
    query: ''
  }

  searchForBooks = (event) => {
    // make sure that the user entered a search
    if(event.target.value.length > 0) {
      BooksAPI.search(event.target.value).then((responce) => {
        // if the responce has an 'error' property
        // set the bookQueryResuls state to undefined
        // so that the user knows there are no books with that query
        if(responce.hasOwnProperty('error')) {
          this.setState({ bookQueryResults: undefined })
        } else {
          // get the shelved books
          let shelvedBooks = this.props.apiBooks

          // loop through the books from the query and
          // set the shelf to none
          for(let book of responce) {
            book.shelf = 'none'
          }
          for(let book of responce) {
            // loop through the shelved books
            for(let shelvedBook of shelvedBooks) {
              // if the shelvedbook.id is the same as the
              // queried book.id then set the .shelf
              if(shelvedBook.id === book.id) {
                book.shelf = shelvedBook.shelf
              }
            }
          }
          this.setState({ bookQueryResults: responce})
        }
      }).catch((error) => {
        console.log('error: ', error)
      })
    } else {
      this.setState({ bookQueryResults: undefined })
    }
  }

  // capture the value of the input field
  // set the query state to the value of
  // the input field and then call searchForBooks()
  updateQuery = (event) => {
    let query = event.target.value
    this.setState({ query })
    this.searchForBooks(event)    
  }

  // prevent submitting the form
  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>Close</Link>
          <div className='search-books-input-wrapper'>
            <form onSubmit={this.handleSubmit} className='search-for-a-book'>
              <input
                type='text'
                placeholder='Search by title'
                name='apiQuery'
                value={this.state.query}
                onChange={(event) => this.updateQuery(event)}
              />
            </form>
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.state.bookQueryResults !== undefined ? (
                this.state.bookQueryResults.hasOwnProperty('error') ? (
                  <li key='no-books-found'>
                    <p className='no-books'>Sorry, but there are no books that match your search.</p>
                  </li>
                ) : (
                  this.state.bookQueryResults.map((book) => (
                    <li key={book.id}>
                      <div className='book'>
                        <div className='book-top'>
                          {book.imageLinks !== undefined ? (
                            <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                          ) : (
                            <div className='book-cover'>Sorry but there's no cover photo for this book.</div>
                          )}                          
                          <div className='book-shelf-changer'>
                            <select onChange={(event) => this.props.moveBook(book, event.target.value)} value={book.shelf}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className='book-title'>{book.title}</div>
                        {book.authors !== undefined ? (
                          <div className='book-authors'>{book.authors}</div>
                        ) : (
                          <div className='book-authors'>Unknown author(s)</div>
                        )}
                      </div>
                    </li>
                  ))
                )
            ) : (
              <li key='no-books-found'>
                <p className='no-books'>Sorry, but there are no books that match your search.</p>
              </li>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default withRouter(SearchPage)