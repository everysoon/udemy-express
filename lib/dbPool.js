const mysql = require('mysql');
let connInfo = {
  host: 'localhost',
  port: '3306',
  user: 'soon',
  password: 'alstjsl1!',
  // multipleStatements: true,
  database: 'udemy_express',
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
    },
  };
})();
