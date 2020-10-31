import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { HeadsetTwoTone } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  title: {
    marginLeft: theme.spacing(2),
  },
}));

const Header = () => {
  const css = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <HeadsetTwoTone />
        <Typography className={css.title} variant="h6" component="h1">
          Apollo Music Share
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
