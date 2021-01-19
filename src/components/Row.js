import React, { useState, useEffect } from "react";
import axios from "../axios";
import styled from "styled-components";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_imageUrl = "https://image.tmdb.org/t/p/original";

const Wrapper = styled.div`
  margin-left: 20px;
  color: #ffffff;
`;

const RowPosters = styled.div`
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;

  }
`;

const RowPoster = styled.img`
  object-fit: contain;
  width: 100%;
  max-height: 100px;
  max-height: ${({ isLargeRow }) => (isLargeRow ? "250px" : "100px")};
  margin-right: 10px;
  transition: transform 450ms;

  &:hover {
    transform: ${({ isLargeRow }) =>
      isLargeRow ? "scale(1.09)" : "scale(1.08)"};
  }
`;

const Row = ({ title, fetchURL, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // when the row loads, make a request to the api
  // if array is blank, run once
  // if array has value, run every time that value changes
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request?.data?.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Wrapper>
      <h2>{title}</h2>
      <RowPosters>
        {movies.map((movie) => (
          <RowPoster
            onClick={() => {
              handleClick(movie);
            }}
            isLargeRow={isLargeRow}
            key={movie.id}
            src={`${base_imageUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </RowPosters>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </Wrapper>
  );
};

export default Row;
