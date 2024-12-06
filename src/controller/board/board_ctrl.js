const ser = require("../../service/board/board_service")

const views = {
    list : async ( req, res )=>{ //게시글 리스트
        const data = await ser.boardRead.list(req.query.start);
        res.send("리스트 페이지")

    },
    writeForm : () => {

    },
    data : () => {

    },
    modifyForm : async () => {

    }
}
const process= {
    write : () => { //게시글 작성

    },
    delete : () => { //게시글 삭제

    },
    modify : () => { //게시글 수정

    }
}
module.exports= { process, views }