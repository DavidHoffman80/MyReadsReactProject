import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MainPage from './MainPage'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'
import './App.css'

class App extends Component {

  state = {
    booksFromAPI: []
  }

  componentDidMount() {
    this.updateState()
  }

  updateState = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ booksFromAPI: books })
      console.log(this.state.booksFromAPI)
    }).catch(error => {
      console.log(error)
    })
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((responce) => {
      console.log(responce)
      this.updateState()
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <div className='App'>
        <Route exact path='/' render={() => (
          <MainPage
            apiBooks={this.state.booksFromAPI}
            moveBook={this.moveBook}
          />
        )}/>
        <Route path='/search' component={SearchPage}/>
      </div>
    );
  }
}

export default App