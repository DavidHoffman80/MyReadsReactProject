import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import serializeForm from 'form-serialize'
import MainPage from './MainPage'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'
import './App.css'

class App extends Component {

  state = {
    booksFromAPI: []
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

  serializeSearchForm = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    console.log(values)
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
              serializeSearchForm={this.serializeSearchForm}
            />
          )}/>
      </div>
    );
  }
}

export default App