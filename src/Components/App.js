import React from 'react';
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import styled, {ThemeProvider} from "styled-components";
import {HashRouter as Router} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Theme from "../Style/Theme";
import GlobalStyles from "../Style/GlobalStyles";
import Routes from "./Routes";
import Header from "./Header";
import Footer from './Footer';


const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width: 100%
`;

export default () => {
  const { data: {isLoggedIn} } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <>
          {isLoggedIn && <Header />}
          <Wrapper>        
            <Routes isLoggedIn={isLoggedIn} />
            <Footer />
          </Wrapper>
          </>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  );
};
