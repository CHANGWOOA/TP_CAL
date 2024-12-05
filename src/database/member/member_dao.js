const oracledb = require("orcledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const loginCheck = async (U_ID) => {
    //db근거 로그인 체크
    const sql = `select * from ALLUSER where id='${U_ID}'`;
    let user;
    try {
        let con = await oracledb.getConnection( dbConfig );
        user = await con.execute( sql )
    } catch (error) {
        console.log( err )
    }
    return user;
}

const getList = async () => {
    const sql = `select * from ALLUSER`;
    let result;
    try{
        const con = await oracledb.getConnection( dbCOnfig );
        result = await con.execute( sql, body );
    }catch(err){
        console.log( err )
    }
    return result;
}


const register = async ( body ) => {
    //회원가입 db등록
    const sql = `insert into ALLUSER values(:U_ID, :U_PW, :U_NAME, :U_TEL)`;
    let result;
    try {
        const con = await oracledb.getConnection( dbConfig );
        await con.execute( sql );
    } catch (err) {
        console.log( err )
    }
}

const U_del = async( U_ID ) => {
    const sql = `delete from ALLUSER where U_ID='${ U_ID }'`;
    try{
        const con = await oracledb.getConnection( dbConfig );
        await con.execute( sql );
    }catch(err){
        console.log( err )
    }
}

const U_modify = async( body ) => {
    const sql = `update ALLUSER set U_PW=:U_PW, U_NAME=:U_NAME, U_TEL=:U_TEL where U_ID=:U_ID`;
    try{
        const con = await oracledb.getConnection( dbConfig );
        await con.execute( sql );
    }catch(err){
        console.log( err )
    }
}

Module.exports = { loginCheck, getList, register, U_del, U_modify };