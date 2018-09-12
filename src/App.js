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
    BooksAPI.getAll().then((books) => {
      this.setState({ booksFromAPI: books })
      console.log('Props: ', this.state.booksFromAPI)
    })
  }

  moveBook = (book) => {
    this.setState((state) => ({
      booksFromAPI: state.booksFromAPI.filter((c) => c.title !== book.title)
    }))
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