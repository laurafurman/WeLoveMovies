// if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
// const criticsRouter = require("./critics/critics.router");
const moviesRouter = require("./movies/movies.router");
// const moviesTheatersRouter = require("./movies_theaters/movies_theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

app.use(express.json());

// app.use('/critics', criticsRouter);
app.use("/movies", moviesRouter);
// app.use('/movies_theaters', moviesTheatersRouter);
app.use('/reviews', reviewsRouter);
app.use('/theaters', theatersRouter);

app.use((req, res, next) => {
  next({ status: 404, message: `Not Found: ${req.originalUrl}`})
});

app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = 'Something went wrong!' } = error;
  res.status(status).json({ error: message });
})

module.exports = app;
