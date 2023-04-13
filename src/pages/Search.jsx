import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      disable: true,
    };
  }

  validateInput = ({ target }) => {
    const { value } = target;
    if (value.length >= 2) {
      this.setState(
        { disable: false },
      );
    }
  };

  render() {
    const {
      disable,
    } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.validateInput }
          />
          <button
            data-testid="search-artist-button"
            disabled={ disable }
          >
            Pesquisar
          </button>
        </div>
      </>
    );
  }
}

export default Search;
