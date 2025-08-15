import React from 'react';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { useParams } from 'react-router-dom';

function Album() {
  const [artistNames, setArtistNames] = React.useState('');
  const [albumName, setAlbumName] = React.useState('');
  const [image, setImage] = React.useState('');
  const [album, setAlbum] = React.useState([]);

  const { id } = useParams()


  const getAlbum = async () => {
    const musicas = await getMusics(id);
    if (musicas.length === 0) {
      console.error('No music found for the given album ID:', id);
      return;
    }
    
    const { artistName } = musicas[0];
    const { collectionName } = musicas[0];
    const { artworkUrl60 } = musicas[0];
    setArtistNames(artistName);
    setAlbumName(collectionName);
    setImage(artworkUrl60);
    setAlbum(musicas);
  };

  React.useEffect(() => {
    getAlbum();
  }, [id]);

  
  return (
    <main className="">
      <div className="" />
      <section className="">
        <div className="">
          <img
            src={image}
            alt=""
            className="w-full h-64 object-cover mb-4 "
            style={{ borderRadius: '0' }}
          />
          <div className="flex items-center gap-4 mt-4 mb-4 text-white ">
            <h1 className=" flex items-center gap-4 mt-4 mb-4 text-white">{artistNames}</h1>
            <h1 className="text-2xl font-bold text-white truncate max-w-md ">
              {albumName}
              {artistNames}
            </h1>
          </div>
        </div>
          <MusicCard
            album={album}
          />
      </section>
    </main>
  );
}
export default Album;
