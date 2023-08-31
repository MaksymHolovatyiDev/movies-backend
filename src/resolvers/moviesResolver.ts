import {MovieType} from 'Types';

const moviesData = require('Data/Movies.json');

const getMovies = () => moviesData;
const getMoviesByName = (args: MovieType) =>
  moviesData.find(
    (el: MovieType) => el.Title.toUpperCase() === args.Title.toUpperCase(),
  );
const searchMoviesByName = (args: MovieType) =>
  moviesData.filter((el: MovieType) =>
    el.Title.toUpperCase().includes(args.Title.toUpperCase()),
  );
const getMoviesByYear = (args: MovieType) =>
  moviesData.filter((el: MovieType) => el.Year === args.Year);

export const root = {
  getMovies,
  getMoviesByName,
  searchMoviesByName,
  getMoviesByYear,
};
