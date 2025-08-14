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
  const [limitAlbums, setLimitAlbums] = React.useState(10);
  const [indexAlbun, setIndexAlbun] = React.useState(0);
  const [countRenderPage, setCountRenderPage] = React.useState(0);

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

    const setNumberPages = Math.ceil(album.length / 10);
    setCountRenderPage(setNumberPages);
  };


  const handleClick = () => {
    setIndexAlbun(indexAlbun + 10)
    setLimitAlbums(limitAlbums + 10)
  }

  const clickPages = (index) => {
    setLimitAlbums((index + 1) * 10)
   if(index === 0){
     setIndexAlbun(0)
   }
    setIndexAlbun(index * 10)
  }




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
              ? <p style={{ textAlign: 'center', marginTop: '40vh' }}>{invalid}</p>
              : <p className="titleSearch">{resposta}</p>}
            <div className="AllAlbuns">

              {albums.slice(indexAlbun, limitAlbums).map((
                { artistName,
                  artworkUrl100,
                  collectionName,
                  collectionId },
                index,
              ) => (
                <tr key={collectionId} className='group hover:bg-white/10 cursor-pointer'>
                  <td className='py-4 text-gray-400'>{index + 1}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <img src={artworkUrl100} alt="" className="w-12 h-12 rounded" />
                      <div>
                        <p className="text-white font-medium">{collectionName}</p>
                        <p className="text-sm text-gray-400">{artistName}</p>
                      </div>
                    </div>
                  </td>
                </tr>

              ))}
            </div>
            {Array.from({ length: countRenderPage }, (_, i) => (
              <button
                onClick={() => clickPages(i)}
              >{i + 1}</button>
            ))}
            {albums.length > 0 && <div>
              <button
                type="button"
                className=""
                onClick={handleClick}
              >
                Carregar mais
              </button>
            </div>}
          </section>
        )
          : <Carregando />
      }
    </section>
  );
}

export default Search;
