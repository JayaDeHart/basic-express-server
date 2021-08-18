const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const validator = require("./middleware/validator");
const notFound = require("./error-handlers/404");
const generalError = require("./error-handlers/500");

app.get("/person", logger, validator, (req, res) => {
  let queriedName = req.query.name;
  res.status(200).json({ name: queriedName });
});

function start(port) {
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
}

app.use("*", notFound);
app.use(generalError);

module.exports = {
  app,
  start,
};
