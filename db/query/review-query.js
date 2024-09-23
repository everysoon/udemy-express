const getAllReviewByUser = ()=>{
 return `select * from review where user_id = $1`;
};
const getAllReviewByTour = ()=>{
  return `select * from review where tour_id = $1`;
 };

const createReview = ()=>{
  return `insert into review 
  (review,rating,user_id,tour_id)
  values $1,$2,$3,$4
  returning *
  `
}
const deleteReview = () =>{
  return `delete from review where id = $1`
}
const updateReview = ()=>{
  return `update review set review = $1 where user_id = $2`
}
module.exports = {
  getAllReviewByUser,
  getAllReviewByTour,
  createReview,
  deleteReview,
  updateReview
};
