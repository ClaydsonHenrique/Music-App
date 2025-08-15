import { createContext } from 'react';

const MusicContext = createContext({
  music: [],
  setMusic: () => {},
}); 

export default MusicContext;