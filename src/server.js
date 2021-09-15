const express = require('express');
const app = express();
const gameRoutes = require('./routes/games');
const bookRoutes = require('./routes/books');
const notFound = require('./error-handlers/404');
const generalError = require('./error-handlers/500');

function start(port) {
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
}

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('it works!');
});

app.use(gameRoutes);
app.use(bookRoutes);
app.use('*', notFound);
app.use(generalError);

module.exports = {
  app,
  start,
};
