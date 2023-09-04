import {MovieType, updateType} from 'Types';
const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'Data', 'Movies.json');

const getMovies = async () =>
  JSON.parse(await fs.promises.readFile(jsonPath, 'utf8'));

const getMovieByName = async (args: MovieType) =>
  JSON.parse(await fs.promises.readFile(jsonPath, 'utf8')).find(
    (el: MovieType) => el.Title.toUpperCase() === args.Title.toUpperCase(),
  );

const searchMoviesByName = async (args: MovieType) => {
  return JSON.parse(await fs.promises.readFile(jsonPath, 'utf8')).filter(
    (el: MovieType) =>
      el.Title.toUpperCase().includes(args.Title.toUpperCase()),
  );
};

const addMovie = async (args: {body: MovieType}) => {
  const moviesData = JSON.parse(await fs.promises.readFile(jsonPath, 'utf8'));
  const movie = await moviesData.find(
    (el: MovieType) => el.Title.toUpperCase() === args.body.Title.toUpperCase(),
  );

  if (movie) return {error: 'Movie already exist!'};

  await fs.writeFile(
    jsonPath,
    JSON.stringify([...moviesData, args.body], null, 4),
    (err: any) => {
      if (err) console.error(err);
      return;
    },
  );

  return [...moviesData, args.body];
};

const updateMovie = async (args: updateType) => {
  const moviesData = JSON.parse(await fs.promises.readFile(jsonPath, 'utf8'));

  const movie = await moviesData.find(
    (el: MovieType) => el.Title.toUpperCase() === args.mainTitle.toUpperCase(),
  );

  if (!movie) return {error: 'Movie doesn`t exist!'};

  const movies = await moviesData.map((el: MovieType) =>
    el.Title === args.mainTitle ? {...el, ...args.body} : el,
  );

  await fs.writeFile(jsonPath, JSON.stringify(movies, null, 4), (err: any) => {
    if (err) console.error(err);
    return;
  });
  return movies;
};

const deleteMovie = async (args: MovieType) => {
  const moviesData = JSON.parse(await fs.promises.readFile(jsonPath, 'utf8'));
  console.log(args);
  const movie = await moviesData.find(
    (el: MovieType) => el.Title.toUpperCase() === args.Title.toUpperCase(),
  );

  if (!movie) return {error: 'Movie doesn`t exist!'};

  const movies = await moviesData.filter(
    (el: MovieType) => el.Title.toUpperCase() !== args.Title.toUpperCase(),
  );

  await fs.writeFile(jsonPath, JSON.stringify(movies, null, 4), (err: any) => {
    if (err) console.error(err);
    return;
  });

  return movies;
};

export const root = {
  getMovies,
  getMovieByName,
  searchMoviesByName,
  addMovie,
  updateMovie,
  deleteMovie,
};
