import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import serializeForm from 'form-serialize'
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {

  state = {
    bookQueryResults: []
  }

  serializeSearchForm = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    this.searchForBooks(values.apiQuery)
  }

  searchForBooks = (query) => {
    BooksAPI.search(query).then((responce) => {
      this.setState({ bookQueryResults: responce})
      console.log('bookQueryResults: ', this.state.bookQueryResults)
    }).catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>Close</Link>
          <div className='search-books-input-wrapper'>
            <form onSubmit={this.serializeSearchForm} className='search-for-a-book'>
              <input type='text' placeholder='Search by title or author' name='apiQuery'/>
            </form>
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.state.bookQueryResults.map((book) => (
              <li key={book.id}>
                <div className='book'>
                  <div className='book-top'>
                    <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                    <div className='book-shelf-changer'>
                      <select onChange={(event) => this.props.moveBook(book, event.target.value)} value="currentlyReading">
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className='book-title'>{book.title}</div>
                  <div className='book-authors'>{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default withRouter(SearchPage)