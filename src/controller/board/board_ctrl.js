
const ser=require("../../service/board/board_service")
const serCom= require("../../service/ser_common")

const views={
    list : ()=>{ //게시글 리스트

    },
    writeForm : (req, res) => {
        res.render("board/write_form", {})
    },
    data : () => {

    }
    // ,
    // modify : async (req, res) => {
    //     const data= await ser.boardRead.data(req,params.P_ID);
    //     res.render("board/modify_form", {data})

    // }
}
const process= {
    write : async (req, res) => { //게시글 작성
        const msg = await ser.boardSer.write(
            req.body
        );
        res.send(msg)
    },
    delete : () => { //게시글 삭제

    }
}
module.exports= {process, views}