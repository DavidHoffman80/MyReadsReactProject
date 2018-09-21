import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MainPage from './MainPage'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'
import { withRouter } from 'react-router-dom'
import './App.css'

class App extends Component {

  state = {
    booksFromAPI: [],
  }

  //Once the compent has mounted call 'BooksAPI.getAll'
  componentDidMount() {
    BooksAPI.getAll().then((booksFromAPI) => {
      // set the booksFromAPI state to books recieved
      // from the api call
      this.setState({ booksFromAPI })
    }).catch((error) => {
      console.log(error)
    })
  }

  // update the booksFromAPI state
  updateState = () => {
    BooksAPI.getAll().then((booksFromAPI) => {
      this.setState({ booksFromAPI })
    }).catch((error) => {
      console.log(error)
    })
  }

  // update a books shelf
  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((responce) => {
      this.updateState()
    }).catch((error) => {
      console.log(error)
    })
  }

  // update a books shelf, this call
  // is coming from the search page
  updateBookShelfFromSearchPage = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      // then update the state
      this.updateState()
    }).catch((error) => {
      console.log(error)
    })
    // send the user back to the main page
    this.props.history.push('/')
  }

  render() {
    return (
      <div className='App'>
        <Route exact path='/' render={() => (
          <MainPage
            apiBooks={this.state.booksFromAPI}
            moveBook={this.updateBookShelf}
          />
        )}/>
        <Route
          path='/search' render={() => (
            <SearchPage
              moveBook={this.updateBookShelfFromSearchPage}
              apiBooks={this.state.booksFromAPI}
            />
        )}/>
      </div>
    );
  }
}

export default withRouter(App)