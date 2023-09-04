import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLInputObjectType,
} from 'graphql';

const MovieData = {
  Title: {type: GraphQLString},
  Year: {type: GraphQLString},
  Rated: {type: GraphQLString},
  Released: {type: GraphQLString},
  Runtime: {type: GraphQLString},
  Genre: {type: GraphQLString},
  Director: {type: GraphQLString},
  Writer: {type: GraphQLString},
  Actors: {type: GraphQLString},
  Plot: {type: GraphQLString},
  Language: {type: GraphQLString},
  Country: {type: GraphQLString},
  Awards: {type: GraphQLString},
  Poster: {type: GraphQLString},
  Metascore: {type: GraphQLString},
  imdbRating: {type: GraphQLString},
  imdbVotes: {type: GraphQLString},
  imdbID: {type: GraphQLString},
  Type: {type: GraphQLString},
  Response: {type: GraphQLString},
  Images: {type: new GraphQLList(GraphQLString)},
};

const Movie = new GraphQLObjectType({
  name: 'Movie',
  fields: () => MovieData,
});

const InputMovie = new GraphQLInputObjectType({
  name: 'InputMovie',
  fields: () => MovieData,
});

const QueryRoot = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getMovies: {
      type: new GraphQLList(Movie),
    },
    getMovieByName: {
      type: Movie,
      args: {Title: {type: GraphQLString}},
    },
    searchMoviesByName: {
      type: new GraphQLList(Movie),
      args: {Title: {type: GraphQLString}},
    },
  },
});

const MutationRoot = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMovie: {
      type: new GraphQLList(Movie),
      args: {body: {type: InputMovie}},
    },
    updateMovie: {
      type: new GraphQLList(Movie),
      args: {
        body: {type: InputMovie},
        mainTitle: {type: GraphQLString},
      },
    },
    deleteMovie: {
      type: new GraphQLList(Movie),
      args: {Title: {type: GraphQLString}},
    },
  },
});

export const schema = new GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot,
});
