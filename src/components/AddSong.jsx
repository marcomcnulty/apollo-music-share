import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { AddBoxOutlined, Link } from '@material-ui/icons';
import ReactPlayer from 'react-player';
import SoundCloudPlayer from 'react-player/lib/players/SoundCloud';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import { useMutation } from '@apollo/react-hooks';
import { ADD_SONG } from '../graphql/mutations';
import { YOUTUBE_IMG_BASE_URL, DEFAULT_SONG } from '../utils';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  urlInput: {
    margin: theme.spacing(1),
  },
  addSongButton: {
    margin: theme.spacing(1),
  },
  dialog: {
    textAlign: 'center',
  },
  thumbnail: {
    width: '90%',
  },
}));

const AddSong = () => {
  const css = useStyles();
  const [addSong, { error }] = useMutation(ADD_SONG);
  const [url, setUrl] = React.useState('');
  const [playable, setPlayable] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);
  const [song, setSong] = React.useState(DEFAULT_SONG);

  React.useEffect(() => {
    const isPlayable =
      SoundCloudPlayer.canPlay(url) || YouTubePlayer.canPlay(url);
    setPlayable(isPlayable);
  }, [url]);

  const handleCloseDialog = () => {
    setDialog(false);
  };

  const handleEditSong = async ({ player }) => {
    // grab the needed player object
    const nestedPlayer = player.player.player;
    let songData;

    // check if youtube player
    if (nestedPlayer.getVideoData) {
      songData = getYouTubeInfo(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundCloudInfo(nestedPlayer);
    }

    setSong({ ...songData, url });
  };

  const handleAddSong = async () => {
    try {
      const { url, thumbnail, duration, title, artist } = song;

      await addSong({
        variables: {
          url: url.length > 0 ? url : null,
          thumbnail: thumbnail.length > 0 ? thumbnail : null,
          duration: duration > 0 ? duration : null,
          title: title.length > 0 ? title : null,
          artist: artist.length > 0 ? artist : null,
        },
      });
      handleCloseDialog();
      setSong(DEFAULT_SONG);
    } catch (err) {
      console.error('Error adding song', err);
    }
  };

  const handleInputError = field => {
    return error?.graphQLErrors[0]?.extensions?.path.includes(field);
  };

  const getYouTubeInfo = player => {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const thumbnail = `${YOUTUBE_IMG_BASE_URL}/${video_id}/0.jpg`;

    return {
      duration,
      title,
      artist: author,
      thumbnail,
    };
  };

  const getSoundCloudInfo = async player => {
    try {
      await player.getCurrentSound(songData => {
        if (songData) {
          return {
            // make sure to return a number in ms
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace('-large', '-t500x500'),
          };
        }
      });
    } catch (error) {
      alert('Could not fetch song info...');
    }
  };

  const handleChangeSong = event => {
    const { name, value } = event.target;
    setSong(prevSong => ({
      ...prevSong,
      [name]: value,
    }));
  };

  const { thumbnail, title, artist } = song;

  return (
    <div className={css.container}>
      <Dialog className={css.dialog} open={dialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img src={thumbnail} alt="Song thumbnail" className={css.thumbnail} />
          <TextField
            value={title}
            onChange={handleChangeSong}
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            error={handleInputError('title')}
            helperText={handleInputError('title') && 'Please fill me in'}
          />
          <TextField
            value={artist}
            onChange={handleChangeSong}
            margin="dense"
            name="artist"
            label="Artist"
            fullWidth
            error={handleInputError('artist')}
            helperText={handleInputError('artist') && 'Please fill me in'}
          />
          <TextField
            value={thumbnail}
            onChange={handleChangeSong}
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
            error={handleInputError('thumbnail')}
            helperText={handleInputError('thumbnail') && 'Please fill me in'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddSong} color="primary">
            Add song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        onChange={event => setUrl(event.target.value)}
        value={url}
        className={css.urlInput}
        placeholder="Add Youtube or SoundCloud URL"
        fullWidth
        margin="normal"
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link />
            </InputAdornment>
          ),
        }}
      />
      <Button
        disabled={!playable}
        className={css.addSongButton}
        onClick={() => setDialog(true)}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
      >
        Add
      </Button>
      <ReactPlayer url={url} hidden onReady={handleEditSong} />
    </div>
  );
};

export default AddSong;
