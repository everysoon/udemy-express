const mysql = require("mysql");

let connInfo = {
  host: "localhost",
  port: "3306",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // multipleStatements: true,
  database: "udemy_express"
  // connectionLimit: dbSetting.connectionLimit,
};
module.exports = (() => {
  let dbPool;
  const initiate = async () => {
    return await mysql.createPool(connInfo);
  };
  return {
    getPool: async () => {
      if (!dbPool) {
        dbPool = await initiate();
        return dbPool;
      } else return dbPool;
    }
  };
})();
