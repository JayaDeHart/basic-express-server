"use strict";

const POSTGRES_URI =
  process.env.NODE_ENV === "test" ? "sqlite:memory" : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require("sequelize");

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const games = require("./games.js");
const books = require("./books.js");

module.exports = {
  db: sequelize,
  Games: games(sequelize, DataTypes),
  Books: books(sequelize, DataTypes),
};
