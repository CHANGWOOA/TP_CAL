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
    upHit : ()=> { //조회수

    },
    delete : () => { //삭제

    },
    modify : () => { //수정

    }
}
module.exports={boardRead, boardInsert, boardUpdate}