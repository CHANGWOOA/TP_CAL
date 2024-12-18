//const { autoCommit } = require("oracledb");
const con = require("../db_common");

const calRead={
    data: async ( username ) => {//사용자가 작성한 데이터 불러오기
            const sql = `select C_ID, T_ID, U_ID, C_TITLE, C_CONTENT, 
            TO_CHAR(C_STARTDATE, 'YYYY-MM-DD') AS C_STARTDATE, 
            TO_CHAR(C_ENDDATE, 'YYYY-MM-DD') AS C_ENDDATE  
            from CAL where U_ID = '${ username }' ORDER BY C_ENDDATE ASC`;
            //TO_CHAR을 이용해 날짜데이터를 문자열로 변환해 YYYY-MM-DD로 출력 후 마감일 임박순으로 정렬
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
        VALUES (cal_seq.nextval, '${username}', '${body.C_TITLE}','${body.C_CONTENT}', 
        TO_DATE('${body.C_STARTDATE}', 'YYYY-MM-DD'), 
        TO_DATE('${body.C_ENDDATE}', 'YYYY-MM-DD'))`;
        //TO_DATE 이용해 문자열을 날짜 형식으로 변환
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
    delete : async (body) => {//해당 캘린더 고유번호의 데이터 삭제
        const sql= `delete from CAL where C_ID='${body.C_ID}'`;
        return (await con).execute( sql );
    },
    modify : async ( body )=>{//캘린더 수정
        const sql = `update Cal set C_TITLE='${body.C_TITLE}', C_CONTENT='${body.C_CONTENT}',
        C_STARTDATE=TO_DATE('${body.C_STARTDATE}' , 'YYYY-MM-DD'), 
        C_ENDDATE=TO_DATE('${body.C_ENDDATE}', 'YYYY-MM-DD') 
        where C_ID=${body.C_ID}`;
        return (await con).execute( sql );
}
}
module.exports={calRead, calInsert, calUpdate}

