const dao= require("../../database/board/board_dao")
const serCom = require("../ser_common")


const boardRead={
    list: () =>{ //게시글 리스트

    },
    data : () => {

    }
}
const boardInsert={ //게시글 작성
    write: async (body)=>{
    let msg, url;
    const  result = await dao.boardInsert.write(body);
    if(result !=0){
        msg = "등록 성공";
        url = "/board/list";
    }else{
        msg = "등록 실패";
        url = "/board/write_form";
    }
    return serCom.getMessage(msg, url);
    }
}
const boardUpdate= {
    upHit : (P_HIT)=> { //조회수
        dao.boardUpdate.upHit(P_HIT);
    },
    delete : (P_ID) => { //삭제
        dao.boardUpdate.delete(P_ID);
    },
    modify : async(body) => { //수정
        
        const result= await dao.boardUpdate.modify(body);
        let msg, url;
        let message= {}
        message.result= result.rowsAffected;
        if(message.result===1){
            msg="게시글 수정 완료";
            url= `/board/data/${body.P_ID}`;
        }else{
            msg="문제가 발생했습니다";
            url= `/board/modify_form/${body.P_ID}`;
            message.result=0;
        }
        message.msg= serCom.getMessage(msg,url);
        return message;
    }
}
module.exports={boardRead, boardInsert, boardUpdate}