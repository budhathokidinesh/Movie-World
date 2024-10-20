import React, { useEffect, useRef, useState } from "react";
import { MovieCard } from "./MovieCard";
import { fetchFromApi } from "../utils/axios";
import { randomChar } from "../utils/randomChar";

export const Hero = ({ addMovieToList }) => {
  const [searchedMovie, setSearchedMovie] = useState({});
  const [bgImg, setBgImg] = useState("");
  const shouldFetch = useRef(true);
  const searchRef = useRef("");

  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (shouldFetch.current) {
      fetchMovie(randomChar());
      shouldFetch.current = false;
    }
  }, []);
  const fetchMovie = async (str) => {
    const movie = await fetchFromApi(str);
    setSearchedMovie(movie);
    setBgImg(movie.Poster);
    setSearching(false);
  };

  const handleOnMovieSearch = () => {
    const str = searchRef.current.value;
    fetchMovie(str);
    searchRef.current.value = "";
  };
  const handleOnDelete = () => {
    setSearchedMovie({});
    setSearching(true);
  };

  const handleOnAddToTheList = (genre) => {
    addMovieToList({ ...searchedMovie, genre });
    setSearchedMovie({});
    setSearching(true);
  };

  const movieStyle = {
    backgroundImage: `url(
    ${searchedMovie.Poster}
    )`,

    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "60vh",
  };

  return (
    <div>
      <nav className="py-3 text-danger fixed-top">
        <h2 className="container">MovieWorld</h2>
      </nav>
      <div
        className="hero d-flex justify-content-center align-items-center text-light"
        style={movieStyle}
      >
        <div className="hero-content">
          <div className={searching ? "form-center" : "form-top"}>
            {searching && (
              <div className="text-center">
                <h1>Search millions of movies</h1>
                <p>Find about the movie more in details before watching them</p>
              </div>
            )}

            <div className="input-group my-5">
              <input
                ref={searchRef}
                onFocus={() => setSearching(true)}
                type="text"
                className="form-control"
                placeholder="Search movies"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button
                onClick={handleOnMovieSearch}
                className="btn btn-danger"
                type="button"
                id="button-addon2"
              >
                Search
              </button>
            </div>
          </div>
          {!searching && (
            <div className="movie-card-display showMovie">
              <MovieCard
                searchedMovie={searchedMovie}
                deleteFunc={handleOnDelete}
                handleOnAddToTheList={handleOnAddToTheList}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
