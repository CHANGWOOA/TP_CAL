const dao= require("../../database/board/board_dao")

const boardRead = {
    list: async ( start ) =>{ //게시글 리스트
        if ( start == undefined )
            start = 1;
        start = Number(start);

        const totalCnt  = await dao.boardRead.totalCnt();
        const num = totalCnt.rows[0]['COUNT(*)'];
        const result = (num % 3 == 0 )? 0 : 1;
        const page = parseInt(num / 3 + result);

        const startNum = ( start - 1 ) * 3;

        let list = await dao.boardRead.list (startNum)
        list = serCom.timeModify( list.rows )
        return {list , start, page};
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