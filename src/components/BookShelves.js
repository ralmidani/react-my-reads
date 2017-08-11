import React from 'react';
import BookShelf from './BookShelf';
import {Link} from 'react-router-dom';

class BookShelves extends React.Component {
  render() {
    const books = this.props.books;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              this.props.shelves.filter(shelf =>
                shelf.apiTitle !== 'none'
              ).map(shelf => 
                <BookShelf key={shelf.apiTitle} 
                           title={shelf.displayTitle}
                           shelves={this.props.shelves} 
                           books={books.filter(book =>
                             book.shelf === shelf.apiTitle)
                           }
                           moveBook={this.props.moveBook}

                />
              )
            }
          </div>
        </div>
        <div className="open-search">
          <Link to="/search/">Add a book</Link>
        </div>
      </div>

    )

  }
}

export default BookShelves;
  