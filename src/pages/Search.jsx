import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';
import '../styles/Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      invalid: '',
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
    if (album.length === 0) {
      this.setState({ invalid: 'Nenhum álbum foi encontrado' });
    }
    this.setState({
      resposta: `Resultado de álbuns de: ${valueChange}`,
      albums: album,
      valueChange: '',
      loading: true,
    });
  };

  render() {
    const {
      invalid,
      resposta,
      albums,
      loading,
      valueChange,
      disable,
    } = this.state;
    return (
      <section className="containerSearch">
        <Header />
        {
          loading ? (
            <section className="continerSonds">
              <div className="page-search">
                <input
                  value={ valueChange }
                  name="find"
                  type="text"
                  className="search-artist-input"
                  onChange={ this.validateInput }
                />
                <button
                  onClick={ this.findArtist }
                  className="search-artist-button"
                  disabled={ disable }
                >
                  Pesquisar
                </button>
              </div>
              <div className="AllAlbuns">
                {albums.length === 0
                  ? <p>{invalid}</p>
                  : <p>{resposta}</p> }
                {albums.map((
                  { artistId,
                    artistName,
                    artworkUrl100,
                    collectionName,
                    collectionId },
                  index,
                ) => (
                  <div key={ index } className="container-albums">
                    <img src={ artworkUrl100 } alt="" className="imgAlbum" />
                    <p>
                      {' '}
                      <Link
                        className="link"
                        data-testid={ `link-to-album-${collectionId}` }
                        to={ `/album/${collectionId}` }
                      >
                        {collectionName}
                      </Link>

                    </p>
                    <p>{artistId}</p>
                    <p>{artistName}</p>
                  </div>
                ))}
              </div>
            </section>
          )
            : <Carregando />
        }
      </section>
    );
  }
}

export default Search;
