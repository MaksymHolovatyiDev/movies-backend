import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
} from 'graphql';

const Movie = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
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
    Metascore: {type: GraphQLInt},
    imdbRating: {type: GraphQLFloat},
    imdbVotes: {type: GraphQLString},
    imdbID: {type: GraphQLString},
    Type: {type: GraphQLString},
    Response: {type: GraphQLString},
    Images: {type: new GraphQLList(GraphQLString)},
  }),
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

export const schema = new GraphQLSchema({query: QueryRoot});
