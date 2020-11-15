import React from "react";
import {
  Avatar,
  IconButton,
  Typography,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useMutation } from "@apollo/react-hooks";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";

const useStyles = makeStyles({
  avatar: {
    width: 44,
    height: 44,
  },
  text: {
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  container: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "50px auto 50px",
    gridGap: 12,
    alignItems: "center",
    marginTop: 10,
  },
  songInfoContainer: {
    overflow: "hidden",
    whitespace: "nowrap",
  },
});

const QueuedSongList = ({ queue }) => {
  const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up("md"));
  const song = {
    title: "Burn the witch",
    artist: "Queens of the Stone Age",
    thumbnail:
      "https://i.ytimg.com/vi/fA92WepJdPQ/hqdefault.jpg?sqp=-oaymwEZCOADEI4CSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDxAe1vc9YqwsuS9ObTAc2RFhCOvA",
  };

  return (
    greaterThanMd && (
      <div style={{ margin: "10px 0" }}>
        <Typography color="textSecondary" variant="button">
          QUEUE ({queue.length})
        </Typography>
        {queue.map((song, idx) => (
          <QueuedSong key={idx} song={song} />
        ))}
      </div>
    )
  );
};

const QueuedSong = ({ song }) => {
  const { thumbnail, title, artist } = song;
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: data => {
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
    },
  });

  const handleAddOrRemoveFromQueue = () => {
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typename: "Song" } },
    });
  };

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
      <IconButton onClick={handleAddOrRemoveFromQueue}>
        <Delete color="error" />
      </IconButton>
    </div>
  );
};

export default QueuedSongList;
