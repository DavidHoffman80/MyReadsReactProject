import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import serializeForm from 'form-serialize'

class SearchPage extends Component {

  // handleSubmit = (e) => {
  //   e.preventDefault()
  //   const values = serializeForm(e.target, { hash: true })
  //   console.log(values)
  // }

  render() {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>Close</Link>
          <div className='search-books-input-wrapper'>
            <form onSubmit={this.props.serializeSearchForm} className='search-for-a-book'>
              <input type='text' placeholder='Search by title or author' name='apiQuery'/>
            </form>
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage