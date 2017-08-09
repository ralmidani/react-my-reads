import React from 'react';
import {getAll, update} from './BooksAPI';
import './App.css';
import Search from './components/Search';
import BookShelf from './components/BookShelf';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    getAll().then(books => this.setState({books}));
  }
  state = {
  /**
   * TODO: Instead of using this state variable to keep track of which page
   * we're on, use the URL in the browser's address bar. This will ensure that
   * users can use the browser's back and forward buttons to navigate between
   * pages, as well as provide a good URL they can bookmark and share.
   */
    showSearchPage: true
  }
  shelves = [
    {apiTitle: 'currentlyReading', displayTitle: 'Currently Reading'}, 
    {apiTitle: 'wantToRead', displayTitle: 'Want to Read'},
    {apiTitle: 'read', displayTitle: 'Read'},
    {apiTitle: 'none', displayTitle: 'None'}
  ]

  moveBook = (book, shelf) => {
    update(book, shelf)
    .then(() => {
      book.shelf = shelf;
      const newState = this.state.books.filter((b) => b.id !== book.id)
                                       .concat(book);
      this.setState({books: newState});               
    });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? 
          <Search goBack={() => this.setState({showSearchPage: false})} /> 
        : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.shelves.filter(shelf => shelf.apiTitle !== 'none')
                             .map(shelf => 
                  <BookShelf key={shelf.apiTitle} 
                             title={shelf.displayTitle}
                             shelves={this.shelves} 
                             books={this.state.books.filter(book =>
                               book.shelf === shelf.apiTitle)
                             }
                             moveBook={this.moveBook}

                  />
                )}
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => 
                this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp
