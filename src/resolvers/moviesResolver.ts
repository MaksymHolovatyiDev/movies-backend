import {Movie} from 'MongooseSchemas/Movie';
import {MovieType, updateType} from 'Types';

const getMovies = async () => await Movie.find({});

const getMovieByName = async (args: MovieType) =>
  await Movie.findOne({Title: args.Title});

const searchMoviesByName = async (args: MovieType) =>
  await Movie.find({Title: {$regex: new RegExp(args.Title, 'i')}});

const addMovie = async (args: {body: MovieType}) => {
  const movie = await Movie.findOne({Title: args.body.Title});

  if (movie) return {error: 'Movie already exist!'};

  await Movie.create({...args.body});

  return await getMovies();
};

const updateMovie = async (args: updateType) => {
  await Movie.findOneAndUpdate({Title: args.mainTitle}, {...args.body});

  return await getMovies();
};

const deleteMovie = async (args: MovieType) => {
  await Movie.findOneAndDelete({Title: args.Title});

  return await getMovies();
};

export const root = {
  getMovies,
  getMovieByName,
  searchMoviesByName,
  addMovie,
  updateMovie,
  deleteMovie,
};
