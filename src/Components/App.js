import React from 'react';
import { ApolloProvider } from "react-apollo-hooks";
import {ThemeProvider} from "styled-components";
import Theme from "../Style/Theme";
import GlobalStyles from "../Style/GlobalStyles";
import AppRouter from "./Router";
import Client from './Apollo/Client';


export default () => (
  <ThemeProvider theme={Theme}>
    <ApolloProvider client={Client}>
      <GlobalStyles />
      <AppRouter isLoggedIn={false} />
    </ApolloProvider>
  </ThemeProvider>
);
