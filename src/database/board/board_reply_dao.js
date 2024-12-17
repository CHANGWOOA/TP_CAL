const con = require("../db_common");

const repInsert= {
    register : async({ P_ID, U_ID, content }) => { //댓글 등록
        const sql = `
        INSERT INTO REPLY (R_ID, P_ID, U_ID, R_CONTENT, R_DATE)
        VALUES (Post_seq.nextval, :P_ID, :U_ID, :content, TO_DATE(TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI'), 'YYYY-MM-DD HH24:MI'))
    `;
    const binds = { P_ID, U_ID, content }; // 바인딩 데이터
    const conn = await con;
    const result = await conn.execute(sql, binds);
    //console.log(binds)
    return result;
    }
}
const repRead = {
    data : async(P_ID) => { //댓글 불러오기
        
        const sql = `SELECT R_ID, P_ID, U_ID, R_CONTENT, TO_CHAR(R_DATE, 'YYYY-MM-DD HH24:MI') AS R_DATE FROM REPLY WHERE P_ID = ${P_ID} ORDER BY R_DATE ASC`;

        
        const replylist = await ( await con ).execute( sql ); //해당 글과 관련된 데이터를 list형식으로 받아옴
        //console.log("dao res: ", replylist.rows)
        return replylist;
    }
}

const repCtrl = { // 댓글 삭제 및 수정(미완성)
    delete : async ( R_ID ) =>{  
        const sql = `delete from REPLY where R_ID='${R_ID}'`;
        (await con).execute( sql );
    },
    modify : async ( body )=>{ 
        const sql = `update post set R_CONTENT='${body.content}' where R_ID=${body.id}; `;
        return (await con).execute( sql, body );
    }
}
module.exports= {repRead, repInsert, repCtrl}
