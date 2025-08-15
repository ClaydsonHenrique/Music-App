import React from 'react';
import MusicContext from './MusicContext';

export const MusicProvider = ({ children }) => {
  const [music, setMusic] = React.useState([]);

  return (
    <MusicContext.Provider value={{ music, setMusic }}>
      {children}
    </MusicContext.Provider>
  );
}
