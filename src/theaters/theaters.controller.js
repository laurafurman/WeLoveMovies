const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const theaters = await theatersService.list()
  for (let theater of theaters) {
    const movies = await theatersService.listMovies(theater.theater_id)
    theater["movies"] = movies;
  }
  res.json({ data: theaters})
}

module.exports = {
  list: [asyncErrorBoundary(list)]
}