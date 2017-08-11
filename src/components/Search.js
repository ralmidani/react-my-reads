import React from 'react';
import {search} from '../BooksAPI';
import Book from './Book';
import {Link} from 'react-router-dom';
/**
 * This component helps avoid the scenario where a query is updated
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
      .then(books => {
        /** 
         * BooksAPI's search function does not reliably return books with a 
         * "shelf" property, so it is necessary to obtain the property from
         * from shelvedBooks (passed down from the App component). This ensures
         * books that have been categorized are shown as such if they appear in
         * a search (this solution surfaced in the Slack channel, but using
         * forEach with an "index" argument and splicing out matched books is
         * my own optimization).
         */
        books = books.map((book) => {
          // Make a copy of this.props.shelvedBooks, since it may be modified.
          let shelvedBooks = this.props.shelvedBooks.slice(0);
          shelvedBooks.forEach((shelvedBook, index) => {
            if (shelvedBook.id === book.id) {
              book.shelf = shelvedBook.shelf;
              // Splice book out of shelvedBooks, to speed up future searches.
              shelvedBooks.splice(index, 1);
            }
          });
          return book;
        });
        this.setState({query, books})
      })
      .catch(error => this.setState({query, books: []}));
    }
  }

  render() {
    const books = this.state.books;
    return (
      <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              {/* 
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
              */}

              {
              // Initialize a component which invokes handleQueryChange only 
              // after user stops typing for 400 milliseconds.
              }
              <InputBoxDoneTyping type="text" 
                     placeholder="Search by title or author"
                     value={this.state.query}
                     doneTyping={(query) => this.handleQueryChange(query)}
                     doneTypingInterval={400}

              />
            </div>
          </div>
          <div className="search-books-results">
            {
              books.length > 0 ? (
                <ol className="books-grid">
                  {
                    this.state.books.map(book => 
                      <Book key={book.id} 
                            model={book}
                            shelves={this.props.shelves}
                            moveBook={this.props.moveBook}
                      />
                    )
                  }
                </ol>
              ) : (
                <h3 className="empty-notice">
                  No results to display; please see the available search terms&nbsp;
                  <a href="https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md" target="_blank">
                    here
                  </a>
                </h3>
              )
            }
            
          </div>
      </div>
    )
  }
}

export default Search;