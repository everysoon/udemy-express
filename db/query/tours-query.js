const getAllTours = () => {
  return `select * from tours`;
};
const getTour = () => {
  return `select * from 
            tours 
          where id = ?`;
};
const createTour = () => {
  return `insert into tours set ?`;
};
const deleteTour = () => {
  return `delete from tours where id = ?`;
};
const updateTour = () => {
  return `update tours set`;
};
const getTourStats = () => {
  return `select id,
  sum(ratingsQuantity) as numRatings,
  count(*) as numTours,
  avg(ratingsAverage) as avgRating,
  avg(price) as avgPrice,
  min(price) as minPrice,
  max(price) as maxPrice
  from tours
  where ratingsAverage > 4.5
  group by id,ratingsQuantity, price, ratingsAverage 
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
  getMonthlyPlan
};
