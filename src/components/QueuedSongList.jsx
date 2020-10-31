import React from 'react';
import {
  Avatar,
  IconButton,
  Typography,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles({
  avatar: {
    width: 44,
    height: 44,
  },
  text: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  container: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '50px auto 50px',
    gridGap: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  songInfoContainer: {
    overflow: 'hidden',
    whitespace: 'nowrap',
  },
});

const QueuedSongList = () => {
  const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));
  const song = {
    title: 'Burn the witch',
    artist: 'Queens of the Stone Age',
    thumbnail:
      'https://i.ytimg.com/vi/fA92WepJdPQ/hqdefault.jpg?sqp=-oaymwEZCOADEI4CSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDxAe1vc9YqwsuS9ObTAc2RFhCOvA',
  };

  return (
    greaterThanMd && (
      <div style={{ margin: '10px 0' }}>
        <Typography color="textSecondary" variant="button">
          QUEUE (5)
        </Typography>
        {Array.from({ length: 5 }, () => song).map((song, idx) => (
          <QueuedSong key={idx} {...song} />
        ))}
      </div>
    )
  );
};

const QueuedSong = ({ title, artist, thumbnail }) => {
  const css = useStyles();

  return (
    <div className={css.container}>
      <Avatar src={thumbnail} alt="Song thumbnail" className={css.avatar} />
      <div className={css.songInfoContainer}>
        <Typography className={css.text} variant="subtitle2">
          {title}
        </Typography>
        <Typography className={css.text} color="textSecondary" variant="body2">
          {artist}
        </Typography>
      </div>
      <IconButton>
        <Delete color="error" />
      </IconButton>
    </div>
  );
};

export default QueuedSongList;
