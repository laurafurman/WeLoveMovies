const knex = require("../db/connection");

// get all movies
function list() {
  return knex("movies")
    .select("movie_id as id", "title", "runtime_in_minutes", "rating", "description", "image_url");
}

// get movies currently playing
function listActiveMovies() {
  return knex("movies as m")
    .distinct()
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.movie_id as id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
    .where({is_showing: true})
}

// get specific movie by ID
function read(movieId) {
  return knex("movies")
    .select("*")
    .where({ movie_id: movieId})
    .first();
}

// get list of theaters showing specific movie by ID
function getTheaters(movieId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.movie_id", "mt.is_showing")
    .where({ "mt.movie_id": movieId })
}

// get critic info by critic ID (will be added to review response)
function getCritic(criticId) {
  return knex("critics")
    .select("*")
    .where({ critic_id: criticId })
}

// get review info for specific movie by ID
function getReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*")
    .where({ "r.movie_id": movieId})
}

module.exports = {
  list,
  listActiveMovies,
  read,
  getTheaters,
  getCritic,
  getReviews
}