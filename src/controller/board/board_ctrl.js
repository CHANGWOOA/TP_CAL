const ser=require("../../service/board/board_service")
const serCom= require("../../service/ser_common")

const views={
    list : ()=>{ //게시글 리스트

    },
    writeForm : () => {

    },
    data : () => {

    },
    modify : async (req, res) => {
        const data= await ser.boardRead.data(req,params.P_ID);
        res.render("board/modify_form", {data})

    }
}
const process= {
    write : () => { //게시글 작성

    },
    delete : () => { //게시글 삭제

    }
}
module.exports= {process, views}