import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { PlayArrow, Save } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(3),
  },
  songInfoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  songInfo: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  thumbnail: {
    objectFit: 'cover',
    width: 140,
    height: 140,
  },
}));

const SongList = () => {
  const css = useStyles();
  let loading = false;

  const song = {
    title: 'Burn the witch',
    artist: 'Queens of the Stone Age',
    thumbnail:
      'https://i.ytimg.com/vi/fA92WepJdPQ/hqdefault.jpg?sqp=-oaymwEZCOADEI4CSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDxAe1vc9YqwsuS9ObTAc2RFhCOvA',
  };

  const Song = ({ title, artist, thumbnail }) => {
    return (
      <Card className={css.container}>
        <div className={css.songInfoContainer}>
          <CardMedia className={css.thumbnail} image={thumbnail} />
          <div className={css.songInfo}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body1" component="p" color="textSecondary">
                {artist}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton size="small" color="primary">
                <PlayArrow />
              </IconButton>
              <IconButton size="small" color="secondary">
                <Save />
              </IconButton>
            </CardActions>
          </div>
        </div>
      </Card>
    );
  };

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
  return (
    <div>
      {Array.from({ length: 10 }, () => song).map((song, idx) => (
        <Song key={idx} {...song} />
      ))}
    </div>
  );
};

export default SongList;
