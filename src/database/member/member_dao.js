const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const loginCheck = async (U_ID) => { //로그인 체크
    //db근거 로그인 체크
    //console.log("memdao loginCheck", U_ID)
    const sql = `select * from ALLUSER where U_ID='${U_ID}'`; //쿼리문에 id를 U_ID로 수정했습니다.
    //console.log("memdao - sql", sql)
    let user;
    try {
        let con = await oracledb.getConnection( dbConfig );
        user = await con.execute( sql )

    } catch (err) { //err로 써줘야 밑에 에러랑 맞춰져서 error를 err로 수정했습니다.
        console.log( err )
    }
    return user;
}

const getList = async () => { //이거 어디서 쓰는지 아는 사람? 알면 주석 고치기
    const sql = `select * from ALLUSER`;
    let result;
    try{
        const con = await oracledb.getConnection( dbConfig );
        result = await con.execute( sql, body );
    }catch(err){
        console.log( err )
    }
    return result;
}

const getUser = async (U_ID) => {
    const sql = `select * from ALLUSER where U_ID='${U_ID}'`;
    let result;
    try{
        const con = await oracledb.getConnection( dbConfig );
        result = await con.execute( sql, body );
    }catch(err){
        console.log( err )
    }
    return result;
}


const register = async ( body ) => { //회원가입
    //회원가입 db등록
    //console.log("memdao회원가입 body", body)
    const sql = `insert into ALLUSER values('${body.id}', '${body.password}', '${body.username}',' ${body.phone}')`;

    
    //console.log("memdao sql", sql)
    let result;
    try {
        const con = await oracledb.getConnection( dbConfig );
        result = await con.execute( sql );
    } catch (err) {
        console.log( err )
    }
    return result;s
}

const U_del = async( U_ID ) => { //유저 삭제(미완성)
    const sql = `delete from ALLUSER where U_ID='${ U_ID }'`;
    try{
        const con = await oracledb.getConnection( dbConfig );
        await con.execute( sql );
    }catch(err){
        console.log( err )
    }
}

const U_modify = async( body ) => { //유저 수정(미완성)
    const sql = `update ALLUSER set U_PW=:U_PW, U_NAME=:U_NAME, U_TEL=:U_TEL where U_ID=:U_ID`;
    try{
        const con = await oracledb.getConnection( dbConfig );
        await con.execute( sql );
    }catch(err){
        console.log( err )
    }
}

module.exports = { loginCheck, getList, register, U_del, U_modify ,getUser};