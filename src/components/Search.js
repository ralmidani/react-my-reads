import React from 'react';
import {search} from '../BooksAPI';
import Book from './Book';

/**
 * This component helps avoid the scenario where the query is updated
 * faster than AJAX requests can yield a new array of books, which
 * resulted in buggy behavior when the user typed or deleted text too
 * quickly.
 */
import InputBoxDoneTyping from 'react-input-box-done-typing';

class Search extends React.Component {
  state = {
    query: '',
    books: []
  }
  
  handleQueryChange = query => {
    if (query === '')
      this.setState({query, books: []});
    else {
      search(query)
      .then(books => this.setState({query, books}))
      .catch(error => this.setState({query, books: []}));
    }
  }

  render() {
    return (
      <div className="search-books">
          <div className="search-books-bar">
            <a className="close-search" 
               onClick={() => this.props.goBack()}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              {/* 
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
              */}
              {
              // Initialize an input component which updates only after user
              // stops typing for 400 milliseconds.
              }
              <InputBoxDoneTyping type="text" 
                     placeholder="Search by title or author"
                     value={this.state.query}
                     doneTyping={(value) => this.handleQueryChange(value)}
                     doneTypingInterval={400}

              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.books.map(book => <Book key={book.id} 
                                                model={book}
                                                shelves={this.props.shelves}
                                                moveBook={this.props.moveBook}
                                            />
              )}
            </ol>
          </div>
      </div>
    )
  }
}

export default Search;