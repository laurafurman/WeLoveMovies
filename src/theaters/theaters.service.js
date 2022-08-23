const knex = require("../db/connection")

//list all theaters
function list() {
  return knex("theaters")
    .select("*")
}

//list movies by theater ID
function listMovies(theaterId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .where({ "mt.theater_id": theaterId })
    .select("m.*", "mt.*")
}

module.exports = {
  list, 
  listMovies
}