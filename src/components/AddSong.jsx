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
  const [dialog, setDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setDialog(false);
  };

  return (
    <div className={css.container}>
      <Dialog className={css.dialog} open={dialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img
            src="https://i1.sndcdn.com/artworks-7OQDyVMWEY0wlkEN-wzkzNQ-t500x500.jpg"
            alt="Song thumbnail"
            className={css.thumbnail}
          />
          <TextField margin="dense" name="title" label="Title" fullWidth />
          <TextField margin="dense" name="artist" label="Artist" fullWidth />
          <TextField
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button color="primary">Add song</Button>
        </DialogActions>
      </Dialog>
      <TextField
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
        className={css.addSongButton}
        onClick={() => setDialog(true)}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
      >
        Add
      </Button>
    </div>
  );
};

export default AddSong;
