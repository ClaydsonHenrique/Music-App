import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      resposta: '',
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
      resposta: `Resultado de álbuns de: ${valueChange}`,
      albums: album,
      valueChange: '',
      loading: true,
    });
  };

  render() {
    const {
      resposta,
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
                <p>
                  {resposta}
                </p>
                {albums.map((
                  { artistId,
                    artistName,
                    artworkUrl100,
                    collectionName,
                    collectionId },
                  index,
                ) => (
                  <ul key={ index }>
                    <li>
                      {' '}
                      <Link
                        className="link"
                        data-testid={ `link-to-album-${collectionId}` }
                        to={ `/album/${collectionId}` }
                      >
                        {collectionName}
                      </Link>

                    </li>
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
