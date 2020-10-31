import React from 'react';
import QueuedSongList from './QueuedSongList';
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Slider,
  CardMedia,
  makeStyles,
} from '@material-ui/core';
import { PlayArrow, SkipNext, SkipPrevious } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 15px',
  },
  content: {
    flex: '1 0 auto',
  },
  thubmnail: {
    width: 150,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const SongPlayer = () => {
  const css = useStyles();
  return (
    <>
      <Card variant="outlined" className={css.container}>
        <div className={css.details}>
          <CardContent className={css.content}>
            <Typography variant="h5" component="h3">
              Song
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              Artist
            </Typography>
          </CardContent>
          <div className={css.controls}>
            <IconButton>
              <SkipPrevious />
            </IconButton>
            <IconButton>
              <PlayArrow className={css.playIcon} />
            </IconButton>
            <IconButton>
              <SkipNext />
            </IconButton>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              00.01.30
            </Typography>
          </div>
          <Slider type="range" min={0} max={1} step={0.01} />
        </div>
        <CardMedia
          className={css.thubmnail}
          image="https://i.ytimg.com/vi/fA92WepJdPQ/hqdefault.jpg?sqp=-oaymwEZCOADEI4CSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDxAe1vc9YqwsuS9ObTAc2RFhCOvA"
        />
      </Card>
      <QueuedSongList />
    </>
  );
};

export default SongPlayer;
