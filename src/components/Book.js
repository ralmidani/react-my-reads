import React from 'react';

class Book extends React.Component {
  handleShelfChange = (event) => {
    this.props.moveBook(this.props.model, event.target.value);
  }

  displayAuthors() {
    const authors = this.props.model.authors;
    const authorsLength = authors.length;
    let result;
    if (authorsLength === 1)
      result = authors[0];
    else if (authorsLength === 2)
      result = authors.join(' and ');
    else {
      result = authors.slice(0, authorsLength - 1).join(', ')
      result += `, and ${authors[authorsLength - 1]}`
    }
    return result;
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("http://books.google.com/books/content?id=${this.props.model.id}&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")` }}></div>
          <div className="book-shelf-changer">
            <select value={this.props.model.shelf} 
                    onChange={this.handleShelfChange}
            >
              <option value="none" disabled>Move to...</option>
              {this.props.shelves.map(shelf => 
              <option
                key={shelf.apiTitle}
                value={shelf.apiTitle}
              >
                {shelf.displayTitle}
              </option>
              )}
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.model.title}</div>
        <div className="book-authors">{this.displayAuthors()}</div>
      </div>
    );
  }
}

export default Book;