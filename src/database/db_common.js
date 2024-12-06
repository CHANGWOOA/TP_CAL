const oracledb = require("orcledb");
const dbConfig = require("../../config/database/db_config");
oracledbdb.autoCommit = ture;
oracledb.outFormat = oracledb.OBJECT;
module.exports = oracledb.getConnection(dbConfig);