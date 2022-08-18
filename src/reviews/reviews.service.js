const knex = require("../db/connection");

// read reviews query
function read(reviewId) {
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .first()
}

// get specific critic info by ID
function getCritic(criticId) {
  return knex("critics")
    .select("*")
    .where({ critic_id: criticId })
}

// update review
function update(updatedReview, id) {
  return knex("reviews")
    .select("*")
    .where({ review_id: id })
    .update({ ...updatedReview }) 
}

// delete query
function destroy(review_id) {
  return knex("reviews")
    .where({ review_id }).del();
}

module.exports = {
  read, 
  getCritic,
  update,
  delete: destroy,
}