import React from 'react'
import ReactDom from 'react-dom'
import App from './App';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import theme from './theme';

ReactDom.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>,
  document.querySelector('#root'));
