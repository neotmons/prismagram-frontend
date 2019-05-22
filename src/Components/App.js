import React from 'react';
import {ThemeProvider} from "styled-components";
import Theme from "../Style/Theme";
import GlobalStyles from "../Style/GlobalStyles";



export default () => (
  <ThemeProvider theme={Theme}>
    <GlobalStyles />
  </ThemeProvider>
);
