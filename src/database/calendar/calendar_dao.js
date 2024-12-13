//const { autoCommit } = require("oracledb");
const con = require("../db_common");

const calRead={
    data: async ( username ) => {//작성한 것 불러오기
            const sql = `select * from CAL where U_ID = '${ username }'`;
            let cal;
            try {
                cal =  await(await con).execute( sql ); 
            } catch (err) {
                console.log(err)
            }
            return cal;
        },
}
const calInsert={
    write: async(body, username)=>{//캘린더 작성
        const sql= `INSERT INTO CAL (C_ID, U_ID, C_TITLE, C_CONTENT, C_STARTDATE, C_ENDDATE)
        VALUES (cal_seq.nextval, '${username}', '${body.C_TITLE}','${body.C_CONTENT}', sysdate, sysdate)`

        //console.log("cal dao", sql)
        let result = 0;
                try{
                    result = await(await con).execute(sql);
                }catch(err){
                    console.log(err)
                }
                return result;
    }

}
module.exports={calRead, calInsert}