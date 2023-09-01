import {MovieType} from 'Types';

const moviesData = require('Data/Movies.json');

const getMovies = () => moviesData;

const getMovieByName = (args: MovieType) =>
  moviesData.find(
    (el: MovieType) => el.Title.toUpperCase() === args.Title.toUpperCase(),
  );

const searchMoviesByName = (args: MovieType) => {
  return moviesData.filter((el: MovieType) =>
    el.Title.toUpperCase().includes(args.Title.toUpperCase()),
  );
};

export const root = {
  getMovies,
  getMovieByName,
  searchMoviesByName,
};
