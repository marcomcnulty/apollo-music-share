import React from 'react';
import { songReducer } from './reducer';
import AddSong from './components/AddSong';
import Header from './components/Header';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import { Grid, useMediaQuery, Hidden } from '@material-ui/core';

export const SongContext = React.createContext({
  song: {
    id: 'da934e94-1f44-4f6e-a295-050c232d90ee',
    title: "3's & 7's",
    artist: 'Queens of the Stone Age',
    thumbnail: 'http://img.youtube.com/vi/Too7nGq_GNA/0.jpg',
    duration: 215,
    url: 'https://www.youtube.com/watch?v=Too7nGq_GNA',
  },
  isPlaying: false,
});

const App = () => {
  const initialSongState = React.useContext(SongContext);
  const [state, dispatch] = React.useReducer(songReducer, initialSongState);
  const greaterThanSm = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));

  return (
    <SongContext.Provider value={{ state, dispatch }}>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid container spacing={3}>
        <Grid
          style={{ paddingTop: greaterThanSm ? 80 : 10 }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            greaterThanMd
              ? {
                  position: 'fixed',
                  width: '100%',
                  right: 0,
                  top: 70,
                }
              : {
                  position: 'fixed',
                  width: '100%',
                  left: 0,
                  bottom: 0,
                }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
};

export default App;
