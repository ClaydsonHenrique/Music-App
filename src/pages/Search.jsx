import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      valueChange: '',
      albums: [],
      disable: true,
      loading: true,
    };
  }

  validateInput = ({ target }) => {
    const { value } = target;
    this.setState({
      valueChange: value,
    });
    if (value.length >= 2) {
      this.setState(
        {
          disable: false,
        },
      );
    }
  };

  findArtist = async () => {
    this.setState({ loading: false });
    const { valueChange } = this.state;
    const album = await searchAlbumsAPI(valueChange);
    this.setState({
      albums: album,
      valueChange: '',
      loading: true,
    });
  };

  render() {
    const {
      albums,
      loading,
      valueChange,
      disable,
    } = this.state;
    return (
      <>
        <Header />
        {
          loading ? (
            <>
              <div data-testid="page-search">
                <input
                  value={ valueChange }
                  name="find"
                  type="text"
                  data-testid="search-artist-input"
                  onChange={ this.validateInput }
                />
                <button
                  onClick={ this.findArtist }
                  data-testid="search-artist-button"
                  disabled={ disable }
                >
                  Pesquisar
                </button>
              </div>
              <div>
                {albums.map(({ artistId, artistName, artworkUrl100 }, index) => (
                  <ul key={ index }>
                    <li>{artistId}</li>
                    <li>{artistName}</li>
                    <li><img src={ artworkUrl100 } alt="" /></li>
                  </ul>
                ))}
              </div>
            </>
          )
            : <Carregando />
        }
      </>
    );
  }
}

export default Search;
