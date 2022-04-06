const jsonServer = require('json-server');

const db = require('./src/db.js');
// const express = require('express');
// const jsonGraphqlExpress = require('json-graphql-server');

// const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;
// app.use(cors());
// app.use('/graphql', jsonGraphqlExpress.default(db()));

const server = jsonServer.create();

// app.listen(port, () => {
//   console.log(`JSON Server is running on port ${port}`);
// });
const router = jsonServer.router(db());
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
