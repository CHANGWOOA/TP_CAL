const boardSer = require("../../service/board/board_service")
const serCom = require("../../service/ser_common")

const views={
    list : ()=>{ //게시글 리스트

    },
    writeForm : (req, res) => {
        res.render("board/write_form", {})
    },
    data : () => {

    },
    modifyForm : async () => {

    }
}
const process= {
    write : async (req, res) => { //게시글 작성
        const msg = await boardSer.boardInsert.write(
            req.body
        );
        res.send(msg)
    },
    delete : (req, res) => { //게시글 삭제
        
    },
    modify : () => { //게시글 수정

    }
}
module.exports= {process, views}