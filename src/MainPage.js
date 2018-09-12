import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MainPage extends Component {
  render() {
    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            <div className='bookshelf'>
              <h2 className='bookshelf-title'>Currently Reading</h2>
              <div className='bookshelf-books'>
                <ol className='books-grid'>
                  {this.props.apiBooks.filter(book => book.shelf === 'currentlyReading').map((book, index) => (
                    <li key={index}>
                      <div className='book'>
                        <div className='book-top'>
                          <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                          <div className='book-shelf-changer'>
                            <select onChange={(event) => this.props.moveBook(book, event.target.value)}>
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
            <div className='bookshelf'>
              <h2 className='bookshelf-title'>Want to Read</h2>
              <div className='bookshelf-books'>
                <ol className='books-grid'>
                  {this.props.apiBooks.filter(book => book.shelf === 'wantToRead').map((book, index) => (
                    <li key={index}>
                      <div className='book'>
                        <div className='book-top'>
                          <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                          <div className='book-shelf-changer'>
                            <select>
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
            <div className='bookshelf'>
              <h2 className='bookshelf-title'>Read</h2>
              <div className='bookshelf-books'>
                <ol className='books-grid'>
                  {this.props.apiBooks.filter(book => book.shelf === 'read').map((book, index) => (
                    <li key={index}>
                      <div className='book'>
                        <div className='book-top'>
                          <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                          <div className='book-shelf-changer'>
                            <select>
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
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search'
            onClick={() => this.setState({ showSearchPage: true })}
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MainPage


{/* <div className='MainPage'>
<header className='MyReads'>
  <h1 className='MyReadsTitle'>MyReads</h1>
  <nav className='nav'>
    <Link
      to='/search'
    >Search</Link>
  </nav>
</header>
<section className='CurrentlyReading'>
  <h2 className='CurrentlyReadingTitle ReadingTitle'>Currently Reading</h2>
  <ol className='CurrentlyReadingBooks'>
    {this.props.apiBooks.filter(book => book.shelf === 'currentlyReading').map((book, index) => (
      <li className='CurrentlyReadingBook' key={index}>
        <img src={book.imageLinks.smallThumbnail} alt={book.title}></img>
        <h3 className='bookTitle'>{book.title}</h3>
      </li>
    ))}
  </ol>
</section>
<section className='WantToRead'>
  <h2 className='WantToReadTitle ReadingTitle'>Want to Read</h2>
  <ol className='WantToReadBooks'>
    {this.props.apiBooks.filter(book => book.shelf === 'wantToRead').map((book, index) => (
      <li className='WantToReadBook' key={index}>
        <img src={book.imageLinks.smallThumbnail} alt={book.title}></img>
        <h3 className='bookTitle'>{book.title}</h3>
      </li>
    ))}
  </ol>
</section>
<section className='Read'>
  <h2 className='ReadingTitle'>Read</h2>
  <ol className='ReadBooks'>
    {this.props.apiBooks.filter(book => book.shelf === 'read').map((book, index) => (
      <li className='ReadBook' key={index}>
        <img src={book.imageLinks.smallThumbnail} alt={book.title}></img>
        <h3 className='bookTitle'>{book.title}</h3>
      </li>
    ))}
  </ol>
</section>
</div> */}