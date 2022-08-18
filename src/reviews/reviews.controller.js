const reviewsService = require("./reviews.service.js");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// //List of valid properties
// const VALID_PROPERTIES = ["score", "content"];

// // check for only valid properties
// function hasOnlyValidProperties(req, res, next) {
//   const { data = {} } = req.body;

//   const invalidFields = Object.keys(data).filter(
//     (field) => !VALID_PROPERTIES.includes(field)
//   );

//   if (invalidFields.length)
//     return next({
//       status: 400,
//       message: `Invalid field(s): ${invalidFields.join(", ")}`,
//     });
//   next();
// }

// check that review exists
async function reviewExists(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({
    status: 404,
    message: `Review cannot be found.`,
  });
}

// check for properties
// const hasRequiredProperties = hasProperties("score", "content");
function hasRequiredProperties(req, res, next) {
  const { data: { score = null, content = null } = {} } = req.body;
  let updatedObject = {}
  if (!score && !content) {
    return next({ status: 400, message: `A score and content property are required.`})
  }
  if(score) {
    updatedObject.score = score;
  }
  if (content) {
    updatedObject.content = content
  }
  res.locals.update = updatedObject;
  next()
}


// update review
async function update(req, res) {
  const { review } = res.locals;
  const { update } = res.locals;
  await reviewsService.update(update, review.review_id)
  const updatedReview = await reviewsService.read(review.review_id)
  const critic = await reviewsService.getCritic(review.critic_id)
  res.status(200).json({ data: { ...updatedReview, critic: critic[0] } })
}

//delete review
async function destroy(req, res) {
  const {review} = res.locals;
  await reviewsService.delete(review.review_id)
  res.sendStatus(204);
}

module.exports = {
  update: [
    asyncErrorBoundary(reviewExists),
    // hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(update)
  ],
  delete: [ asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
