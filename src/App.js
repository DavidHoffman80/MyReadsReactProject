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

  componentDidMount() {
    BooksAPI.getAll().then((booksFromAPI) => {
      this.setState({ booksFromAPI })
      console.log('Component mounted and state updated: ', this.state.booksFromAPI)
    }).catch((error) => {
      console.log(error)
    })
  }

  updateState = () => {
    BooksAPI.getAll().then((booksFromAPI) => {
      this.setState({ booksFromAPI })
      console.log('State is updated: ', this.state.booksFromAPI)
    }).catch((error) => {
      console.log(error)
    })
  }

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((responce) => {
      console.log('responce: ', responce)
      this.updateState()
    }).catch((error) => {
      console.log(error)
    })
  }

  updateBookShelfFromSearchPage = (book, shelf) => {
    BooksAPI.update(book, shelf).then((responce) => {
      console.log('responce 2: ', responce)
      this.updateState()
    }).catch((error) => {
      console.log(error)
    })
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
            />
        )}/>
      </div>
    );
  }
}

export default withRouter(App)