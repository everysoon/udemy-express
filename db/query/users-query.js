const getAllUsers = () => {
  return `select * from users`;
};
const getUser = () => {
  return `select * from 
            users 
          where id = ?`;
};
const createUser = () => {
  return `insert into users 
  (name,email,user_role,active,photo,pwd)
  values (?,?,?,?,?,?)
  `;
};
const deleteUser = () => {
  return `update users set active = false where id = ?`;
};
const updateUser = () => {
  return `update users set name = ?, email = ? where id = ?`;
};
module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
