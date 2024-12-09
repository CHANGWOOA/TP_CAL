const ser= require("../../service/board/board_reply_service")

const process= {
    register : async(req, res) => { //코멘트 작성
        const result= await ser.repInsert.register(req.body);
        res.json(result);

    },
    modify : async(req, res)=>{
        const result= await ser.repUpdate.modify(req.body);
        res.json(result);
    },
    delete : (req, res)=>{
        ser.repUpdate.delete(req.params.R_ID);
        res.redirect("/");
    }

}
const views= {
    data : async(req, res) => { //코멘트 목록
        const result= await ser.repRead.data(req.params.R_ID); //댓글번호(R_ID)로 댓글 조회
        res.json(result);
    }
}
module.exports= {process, views}