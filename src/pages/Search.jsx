import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useHistory } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';

function Search() {

  const history = useHistory();

  const [invalid, setInvalid] = React.useState('');
  const [resposta, setResposta] = React.useState('');
  const [valueChange, setValueChange] = React.useState('');
  const [albums, setAlbums] = React.useState([]);
  const [disable, setDisable] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [limitAlbums, setLimitAlbums] = React.useState(10);
  const [albumName, setAlbumName] = React.useState('');


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
    setResposta(`Resultado de álbuns de: `);

    setAlbums(album);
    setValueChange('');
    setLoading(true);
    setAlbumName(valueChange);


  };

  const handleAlbumClick = (collectionId) => {
    history.push(`/album/${collectionId}`);
  };


  const handleClick = () => {
    setLimitAlbums(limitAlbums + 10)
  }



  return (
    <section className=" ">
      {
        loading ? (
          <section className="">
            <div className="relative">
              <button
                onClick={findArtist}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 cursor-pointer"
                disabled={disable}

              >
                <SearchIcon />
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
              ? <p >{invalid}</p>
              : <p className="text-white my-6">{resposta}<span className='text-green-500 '>{albumName}</span></p>}
            <div className="AllAlbuns">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {albums.slice(0, limitAlbums).map(
                  ({ artistName, artworkUrl100, collectionName, collectionId }, index) => (
                    <button
                      key={collectionId}
                      className="flex items-center gap-4 bg-white/5 p-3 rounded-lg hover:bg-white/10 cursor-pointer"
                      onClick={() => handleAlbumClick(collectionId)}
                    >
                      <span className="text-gray-400">{index + 1}</span>
                      <img
                        src={artworkUrl100}
                        alt={collectionName}
                        className="w-12 h-12 rounded"
                      />
                      <div>
                        <p className="text-white font-medium">{collectionName}</p>
                        <p className="text-sm text-gray-400">{artistName}</p>
                      </div>
                    </button>
                  )
                )}
              </div>
            </div>
            {limitAlbums >= albums.length ? <div>

            </div>
              :
              <div>          <button
                type="button"
                className="my-4 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                onClick={handleClick}
              >
                Carregar mais
              </button></div>
            }
          </section>
        )
          : <Carregando />
      }
    </section>
  );
}

export default Search;
