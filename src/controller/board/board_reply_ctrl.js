const ser= require("../../service/board/board_reply_service")

const process= {
    register : async(req, res) => { //코멘트 작성
        const result= await ser.insert.register(req.body);
        res.json(result);

    }
}
const views= {
    data : async(req, res) => { //코멘트 목록
        const result= await ser.repRead.data(req.params.R_ID); //댓글번호(R_ID)로 댓글 조회
        res.json(result);
    }
}
module.exports= {process, views}