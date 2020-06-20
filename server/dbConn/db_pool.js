const mysql = require("mysql");
var util = require("util");

var pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "office-app-admin",
  password: "Qwerty@1298",
  database: "office-app",
  dateStrings: true
});

pool.getConnection = util.promisify(pool.getConnection);
pool.query = util.promisify(pool.query);

pool.getTransactionalConn = async () => {
  const connection = await pool.getConnection();
  connection.rollback = util.promisify(connection.rollback);
  connection.commit = util.promisify(connection.commit);
  // connection.release = util.promisify(connection.release);
  connection.query = util.promisify(connection.query);
  return connection;
};

// pool.releaseConnection = connection => {
//   connection.release();
// };

// console.log(pool);

module.exports = pool;
