const ser= require("../../service/board/board_reply_service")

const process= {
    register : async(req, res) => { //코멘트 작성
        const result= await ser.repInsert.register(req.body);
        res.json(result);//json 형태로 출력

    },
    modify : async(req, res)=>{ //수정
        const result= await ser.repUpdate.modify(req.body);
        res.json(result);
    },
    delete : (req, res)=>{ //댓글아이디(R_ID) 받아 해당 댓글 삭제
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