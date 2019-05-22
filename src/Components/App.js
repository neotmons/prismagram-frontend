import React from 'react';
import {ThemeProvider} from "styled-components";
import Theme from "../Style/Theme";
import GlobalStyles from "../Style/GlobalStyles";
import AppRouter from "./Router";


export default () => (
  <ThemeProvider theme={Theme}>
  <>
    <GlobalStyles />
    <AppRouter isLoggedIn={!false} />
  </>
  </ThemeProvider>
);
