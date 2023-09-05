import 'dotenv/config';
import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import {root} from 'resolvers/moviesResolver';
import {schema} from 'schema/movieSchema';
import cors from 'cors';
import mongoose from 'mongoose';

const {DB_HOST} = process.env;
const app = express();

mongoose.set('strictQuery', true);
if (typeof DB_HOST === 'string')
  mongoose
    .connect(DB_HOST)
    .then(() => {
      console.log('DB connected!');
    })
    .catch(console.log);

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
