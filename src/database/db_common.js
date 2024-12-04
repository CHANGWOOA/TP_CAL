const oracledb = require("orcledb");
const dbConfig = require("");
oracledbdb.autoCommit = ture;
oracledb.outFormat = oracledb.OBJECT;
module.exports = oracledb.getConnection(dbConfig);