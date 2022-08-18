const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./movies.controller");
const cors = require("cors");

// route to list a movie by ID
router.route("/:movieId")
  .get(cors(), controller.read)
  .all(methodNotAllowed)

// route to list theaters showing specific movie by ID
router.route("/:movieId/theaters")
  .get(cors(), controller.getTheaters)
  .all(methodNotAllowed)

// route to list reviews (with critic info) for specific movie by ID
router.route("/:movieId/reviews")
  .get(cors(), controller.getReviews)
  .all(methodNotAllowed)

// route to list all movies (includes is_showing query)
router.route("/")
  .get(cors(), controller.list)
  .all(methodNotAllowed)


module.exports = router;