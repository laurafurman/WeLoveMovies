const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");

// list all movies with no query, list all movie currently playing with ?is_showing=true
async function list(req, res) {
  const { is_showing } = req.query;
  if (is_showing) {
    res.status(200).json({ data: await moviesService.listActiveMovies() })
  } else {
    res.status(200).json({ data: await moviesService.list() })
  }
}

// verify movie ID exists
async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next()
  }
  next({ status: 404, message: `Movie cannot be found`})
}

// read all movies
function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data })
}

// list theaters currently showing specific movie by ID
async function getTheaters(req, res) {
  const { movieId } = req.params;
  const theaterList = await moviesService.getTheaters(movieId)
  res.json({ data: theaterList})
}

// list reviews (including critic info) for sepcific movie by ID
async function getReviews(req, res) {
  const { movieId } = req.params
  const reviews = await moviesService.getReviews(movieId);
  const allReviews = [];
  for(let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    const critic = await moviesService.getCritic(review.critic_id);
    review.critic = critic[0]
    allReviews.push(review)
  }
  res.status(200).json({ data: allReviews})
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  getTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(getTheaters)],
  getReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(getReviews)]
}