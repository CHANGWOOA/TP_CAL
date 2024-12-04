const oracledb = require("orcledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const loginCheck = () => {
    //db근거 로그인 체크
    const sql = ``;
    try {
        
    } catch (error) {
        
    }
}
const register = () => {
    //회원가입 db등록
    const sql = ``;
    try {
        
    } catch (error) {
        
    }
}

Module.exports = {loginCheck, register};