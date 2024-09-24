const getAllReviewByUser = () => {
  return `select * from review where user_id = ?`;
};
const getAllReviewByTour = () => {
  return `select * from review where tour_id = ?`;
};

const createReview = () => {
  return `insert into review 
  (review,rating,user_id,tour_id)
  values (?,?,?,?)
  `;
};
const deleteReview = () => {
  return `delete from review where id = ?`;
};
const updateReview = () => {
  return `update review set review = ?  where user_id = ?`;
};
module.exports = {
  getAllReviewByUser,
  getAllReviewByTour,
  createReview,
  deleteReview,
  updateReview,
};
