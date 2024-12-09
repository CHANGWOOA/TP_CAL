const dao= require("../../database/board/board_reply_dao")
const repInsert= {
    register : async(body) => { //코멘트 작성
        const result= await dao.repInsert.register(body)
        return result.rowsAffected; //rowsAffected (영향을 받은 행의 수)를 반환
    }
}
const common= require("../ser_common");
const repRead={
    data : async(R_ID)=>{// 답글 번호 받아와 시간 수정
        let result= await dao.repRead.data(R_ID);
        result= common.timeModify(result.rows);
        return result;
    }
}
const repUpdate={
    delete : (R_ID)=>{//답글 삭제
        dao.repUpdate.delete(R_ID);
    },
    modify : (body)=>{//답글 수정
        dao.repUpdate.modify(body);


    }
}
module.exports= {repRead, repInsert, repUpdate}