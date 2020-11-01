import React from 'react'
import ReactDom from 'react-dom'
import App from './App';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';
import theme from './theme';
import client from "./graphql/client"

ReactDom.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>
  </ApolloProvider>,
  document.querySelector('#root'));
