const getAllTours = () => {
  return `select * from tours`;
};
const getTour = () => {
  return `select * from 
            tours 
          where id = ?`;
};
const createTour = () => {
  return `insert into tours 
  (name,duration,maxGroupSize,difficulty,ratingsAverage,
  ratingQuantity,price,summary,description,imageCover,
  images,startDates)
  values (?,?,?,?,?,?,?,?,?,?,?,?)
  `;
};
const deleteTour = () => {
  return `delete from tours where id = ?`;
};
const updateTour = () => {
  return `update tours set`;
};
module.exports = {
  getAllTours,
  getTour,
  createTour,
  deleteTour,
  updateTour,
};
