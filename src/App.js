import React from 'react';
import './App.css';
import {getAll, update} from './BooksAPI';
import {Route} from 'react-router-dom';
import Search from './components/Search';
import BookShelves from './components/BookShelves';

class App extends React.Component {
  state = {
    books: []
  }

  shelves = [
    {apiTitle: 'currentlyReading', displayTitle: 'Currently Reading'}, 
    {apiTitle: 'wantToRead', displayTitle: 'Want to Read'},
    {apiTitle: 'read', displayTitle: 'Read'},
    {apiTitle: 'none', displayTitle: 'None'}
  ]

  componentDidMount() {
    getAll().then(books => this.setState({books}));
  }

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
        <Route exact path="/" render={() => 
          <BookShelves shelves={this.shelves}
                       moveBook={this.moveBook}
                       books={this.state.books}
          />
        } />
        <Route exact path="/search" render={() => 
          <Search shelves={this.shelves}
                  moveBook={this.moveBook}
                  shelvedBooks={this.state.books}
          />
        } />
      </div>
    );
  }
}

export default App
