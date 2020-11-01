import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_SONGS } from '../graphql/queries';
import { CircularProgress } from '@material-ui/core';
import Song from './Song';

const SongList = () => {
  const { data, loading, error } = useQuery(GET_SONGS);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 50,
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>ERROR FETCHING SONGS!</div>;
  }
  return (
    <div>
      {data.songs.map(song => (
        <Song key={song.id} {...song} />
      ))}
    </div>
  );
};

export default SongList;
