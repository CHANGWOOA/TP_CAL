const ser= require("../../service/board/board_reply_service")

const process= {
    repRegister : async(req, res) => { //코멘트 작성
        const { content } = req.body; // 댓글 내용
        const { P_ID } = req.params; // 게시물 ID는 URL에서 가져옴
        const username = req.session.username; // 세션에서 사용자 ID 가져오기
    
        //console.log("컨트롤에서 :", { P_ID, content }, username);
    
        await ser.repInsert.register({ P_ID, U_ID: username, content });
        //댓글 작성을 완료하면 원래 링크로 반환
        res.redirect(`/board/detail/${P_ID}`);
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
        const result= await ser.repRead.data(req); //댓글번호(R_ID)로 댓글 조회
        
        return result;
    }
}
module.exports= {process, views}