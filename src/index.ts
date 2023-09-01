import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import {root} from 'resolvers/moviesResolver';
import {schema} from 'schema/movieSchema';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.listen(5000, () => {
  console.log(
    'GraphQL server with Express running on http://localhost:5000/graphql',
  );
});
