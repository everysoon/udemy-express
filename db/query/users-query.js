const getAllUsers = () => {
  return `select * from users`;
};
const login = () => {
  return `select * from users
  where email = ?`;
};

const getUser = () => {
  return `select * from 
            users 
          where id = ?`;
};
const createUser = () => {
  return `insert into users 
   (name, email, active, photo, pwd)
   values (
    ?,?,?,?,?
  )`;
};
const deleteUser = () => {
  return `update users set active = false where id = ?`;
};
const updateUser = () => {
  return `update users set name = ?, email = ? where id = ?`;
};
const updatePassword = () => {
  return `update users set pwd = ? where id = ?`;
};
module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  login,
  updatePassword
};
