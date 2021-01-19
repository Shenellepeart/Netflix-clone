import React from "react";
import "./App.css";
import Row from "./components/Row";
import Banner from "./components/Banner";
import NavBar from "./components/NavBar";
import requests from "./requests";
import styled from 'styled-components';

const AppWrapper = styled.div`
background-color: #011;
overflow-y: hidden;
`;

function App() {
  return (
    <AppWrapper className="App">
      <NavBar/>
      <Banner/>
      <Row title="Trending Now" fetchURL={requests.fetchTrending} isLargeRow/>
      <Row title="Top Rated" fetchURL={requests.fetchTrending} />
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
    </AppWrapper>
  );
}

export default App;
