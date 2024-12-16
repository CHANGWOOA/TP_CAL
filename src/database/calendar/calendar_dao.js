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
        }
}
const calInsert={
    write: async(body, username)=>{//캘린더 작성
        const sql= `INSERT INTO CAL (C_ID, U_ID, C_TITLE, C_CONTENT, C_STARTDATE, C_ENDDATE)
        VALUES (cal_seq.nextval, '${username}', '${body.C_TITLE}','${body.C_CONTENT}', TO_DATE('${body.C_STARTDATE}', 'YYYY-MM-DD HH24:MI:SS'), 
                TO_DATE('${body.C_ENDDATE}', 'YYYY-MM-DD HH24:MI:SS'))`;

        console.log("cal dao", sql)
        let result = 0;
                try{
                    result = await(await con).execute(sql);
                }catch(err){
                    console.log(err)
                }
                return result;
    }
}
const calUpdate= {
    delete : async (body) => {
        const sql= `delete from CAL where C_ID='${body.C_ID}'`;
        return (await con).execute( sql );
    },
    modify : async ( body )=>{
        const sql = `update Cal set C_TITLE='${body.C_TITLE}', C_CONTENT='${body.C_content}',C_STARTDATE=${body.C_STARTDATE} , C_ENDDATE=${body.C_ENDDATE} where C_ID=${body.C_ID}`;
        return (await con).execute( sql );
}
}
module.exports={calRead, calInsert, calUpdate}
