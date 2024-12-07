const ser = require("../../service/board/board_service")

const views={
    list : async (req, res)=>{ //게시글 리스트
        const data = await ser.boardRead.list ( req.query.start ) //http://...//list?start=10 ->이 경우req.query.start =10
        res.render("board/board", { list: data.list, start:data.start, page: data.page })
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
module.exports= {process, views}