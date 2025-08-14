import React from 'react';
import { Search as SearchIcon, Play } from 'lucide-react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';

function Search() {

  const [invalid, setInvalid] = React.useState('');
  const [resposta, setResposta] = React.useState('');
  const [valueChange, setValueChange] = React.useState('');
  const [albums, setAlbums] = React.useState([]);
  const [disable, setDisable] = React.useState(true);
  const [loading, setLoading] = React.useState(true);

  const validateInput = ({ target }) => {
    const { value } = target;
    setValueChange(value);

    if (value.length >= 2) {
      setDisable(false);
    }
  };

 const findArtist = async () => {
    setLoading(false);
    const album = await searchAlbumsAPI(valueChange);
    if (album.length === 0) {
      setInvalid('Nenhum álbum foi encontrado')
    }
    setResposta(`Resultado de álbuns de: ${valueChange}`);
    setAlbums(album);
    setValueChange('');
    setLoading(true);

  };

  return (
    <section className="containerSearch">
      {
        loading ? (
          <section className="continerSonds">
            <div className="relative">
              <button
                onClick={findArtist}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 cursor-pointer"
                disabled={disable}

              >
                <SearchIcon/>
              </button>
              <input
                value={valueChange}
                name="find"
                type="text"
                className="w-full pl-12 pr-4 py-3 bg-white/10 rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                onChange={validateInput}
                placeholder="nome do artista"
              /> 
             
            </div>
            {albums.length === 0
              ? <p style={{ textAlign: 'center', marginTop: '40vh' }}>{invalid}</p>
              : <p className="titleSearch">{resposta}</p>}
            <div className="AllAlbuns">

              {albums.map((
                { artistName,
                  artworkUrl100,
                  collectionName,
                  collectionId },
                index,
              ) => (
                <div key={index} className="container-albums">
                  <p>
                    {' '}
                    <Link
                      className="link"
                      data-testid={`link-to-album-${collectionId}`}
                      to={`/album/${collectionId}`}
                    >
                      <img src={artworkUrl100} alt="" className="imgAlbum" />
                      {collectionName}
                    </Link>
                  </p>
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

export default Search;
