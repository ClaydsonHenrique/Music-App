import React from 'react';
import Header from '../components/Header';
import searchAlbum from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      album: '',
      artist: '',
      disable: true,
    };
  }

  validateInput = ({ target }) => {
    const { value } = target;
    if (value.length >= 2) {
      this.setState(
        {
          disable: false,
          artist: value,

        },
      );
    }
  };

  onFindArtist = async () => {
    const {
      artist,
    } = this.state;
    const listaAlbums = await searchAlbum(artist);
    this.setState(
      {
        album: listaAlbums },
    );
    console.log(listaAlbums.length);
    console.log(searchAlbum(artist));
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
            onClick={ this.onFindArtist }
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
