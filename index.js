const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { JWT_SECRET } = require('./config');

const { PORT } = require('./config');
const { dbConnect } = require('./db-mongoose');

const app = express();

app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
  skip: (req, res) => process.env.NODE_ENV === 'test',
}));

app.use(cors());

// The GraphQL schema in string form
const typeDefs = require('./typeDefinitions');
const resolvers = require('./resolvers/index');

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// custom middleware auth middleware
app.use((req, res, next) => {
  if (req.headers.authorization) {
    const authToken = req.headers.authorization;
    console.log('​---------------------');
    console.log('​authToken', authToken);
    console.log('​---------------------');

    let verdict;

    try {
      // verdict is a decoded obj of the user
      verdict = jwt.verify(authToken, JWT_SECRET);
      req.user = verdict;

      console.log('​-----------------');
      console.log('​verdict auth', verdict);
      console.log('​-----------------');
    } catch (e) {
      res.json({ message: 'Not a valid token!' });
    }
  }

  next();
});

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress(req => ({ schema, context: req })));

// GraphiQL, a visual editor for queries
app.use('/', graphiqlExpress({ endpointURL: '/graphql' }));

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', (err) => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
