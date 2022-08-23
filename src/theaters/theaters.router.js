const router = require("express").Router({ mergeParam: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

// route for /theaters
router.route("/")
  .get(cors(), controller.list)
  .all(methodNotAllowed)

module.exports = router