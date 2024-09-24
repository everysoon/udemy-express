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
const getTourStats = () => {
  return `select id,
  sum(ratingQuantity) as numRatings,
  count(*) as numTours,
  avg(ratingsAverage) as avgRating,
  avg(price) as avgPrice,
  min(price) as minPrice,
  max(price) as maxPrice
  from tours
  where ratingsAverage > 4.5
  group by id,ratingQuantity, price, ratingsAverage 
  `;
};
const getMonthlyPlan = () => {
  return `select id,
  count(*) as numTourStarts,
  
  limit 12
  `;
};
module.exports = {
  getAllTours,
  getTour,
  createTour,
  deleteTour,
  updateTour,
  getTourStats,
  getMonthlyPlan,
};
