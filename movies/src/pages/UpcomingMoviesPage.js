import { getUpcomingMovie } from "../api/tmdb-api";
import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'

const UpcomingMoviesPage = (props) => {
  const [movies, setMovies] = useState([]);
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  const addToFavorites = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, favorite: true } : m
    );
    setMovies(updatedMovies);
  };

  useEffect(() => {
    getUpcomingMovie().then(movies => {
        setMovies(movies);
    });
  }, []);

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      selectFavorite={addToFavorites}
    />
  );
};

export default UpcomingMoviesPage;