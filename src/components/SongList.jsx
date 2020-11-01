import React from 'react';
import { useSubscription } from '@apollo/react-hooks';
import { GET_SONGS } from '../graphql/subscriptions';
import { CircularProgress } from '@material-ui/core';
import Song from './Song';

const SongList = () => {
  const { data, loading, error } = useSubscription(GET_SONGS);

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
