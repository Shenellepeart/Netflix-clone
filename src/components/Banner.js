import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "../axios";
import requests from "../requests";

const Wrapper = styled.header`
  background-size: cover;
  background-position: top;
  color: #ffffff;
  object-fit: contain;
  height: 448px;
`;

const Contents = styled.div`
  margin-left: 30px;
  padding-top: 140px;
  height: 190px;
`;
const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.3rem;
`;

const ButtonWrapper = styled.div``;

const StyledButton = styled.button`
  cursor: pointer;
  color: #ffffff;
  outline: none;
  border: none;
  font-weight: 700;
  border-radius: 0.2vw;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-right: 1rem;
  padding-top: 0.5rem;
  background-color: rgba(51, 51, 51, 0.5);
  padding-bottom: 0.5rem;

  :hover {
    color: #000;
    background-color: #e6e6e6;
    transition: all 0.2s;
  }
`;

const Description = styled.h1`
  width: 100%;
  line-height: 1.3rem;
  padding-top: 1rem;
  font-size: 0.8rem;
  max-width: 360px;
  height: 80px;
`;

const FakeBottom = styled.div`
  height: 7.4rem;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
`;

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <Wrapper
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
      }}
    >
      <Contents>
        <Title>{movie?.title || movie?.name || movie?.original_name}</Title>
        <ButtonWrapper>
          <StyledButton>Play</StyledButton>
          <StyledButton>My List</StyledButton>
        </ButtonWrapper>
        <Description>{truncate(movie?.overview, 150)}</Description>
      </Contents>
      <FakeBottom />
    </Wrapper>
  );
};

export default Banner;
