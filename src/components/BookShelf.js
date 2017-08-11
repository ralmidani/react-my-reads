import React from 'react';
import Book from './Book';

class BookShelf extends React.Component {
  render() {
    const books = this.props.books;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.length > 0 ? (
                this.props.books.map(book => 
                  <Book key={book.id} 
                        model={book}
                        shelves={this.props.shelves}
                        moveBook={this.props.moveBook}
                  />
                )
              ) : (
                <h3 className="empty-notice">You have no books on this shelf</h3>
              )
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;