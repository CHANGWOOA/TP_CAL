const dao= require("../../database/board/board_dao")

const boardRead={
    list: () =>{ //게시글 리스트

    },
    data : () => {

    }
}
const boardInsert={ //게시글 작성
    write: ()=>{

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