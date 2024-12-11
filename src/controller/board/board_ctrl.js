
const { user } = require("../../../config/database/db_config")
const ser = require("../../service/board/board_service")
const serCom= require("../../service/ser_common")


const views={
    list : async (req, res)=>{ //게시글 기본 리스트 가져오는 기능
        const data = await ser.boardRead.list ( req.query.start ) //http://...//list?start=10 ->이 경우req.query.start =10
        res.render("board/board", { list: data.list, start:data.start, page: data.page })
    

        //console.log("b ctrl views:", data.list, data.start, data.page)

        console.log("b ctrl views:", data.list)
    
    }, //결과값을 data로 정의함
    writeForm : (req, res) => {
        const msg = serCom.sessionCheck(req.session);
        if(msg == 0){
            return res.send(msg);
        }
        res.render("board/write_form", {body: req.body, username : req.session.username}) // 전송할 데이터 - 유저 정보
    },

    detail : async (req, res) => { //글 제목 클릭했을 때의 기능
        //console.log("ctrl에서의 params:", req.params.P_ID)
        const contentList = await ser.boardRead.detail (req.params.P_ID) //클릭 시 들어오는 params를 서비스로 전송하고
        //console.log("board ctrl:", contentList.rows)

        const data = contentList //dao를 거쳐 온 P_ID글고유번호에 대한 해당 글의 정보 리스트를 배열형식으로 받아 data 변수에 저장
        const uphit = await ser.boardRead.data(req.params.P_ID)
        res.render("board/board_detail", { data }) //data를 ejs로 보낸다->ejs 사용하지 않고 data[0].P_ID 형식으로 바로 정보 받을 수 있음
        //console.log("b ctrl detail:", data)

    },
    modifyForm : async (req, res) => {
        console.log('req params',req.params.P_ID)
        const data= await ser.boardRead.detail(req.params.P_ID);
        // console.log('modify form : ',data)
        res.render("board/modify_form", {data});

    },
    search : async( req, res ) =>{ //글 검색하는 기능
        //console.log("board ctrl search:", req.body.searchKey)
        const result = await ser.boardRead.search( req.body.searchType, req.body.searchKey ) 
        //console.log("board ctrl search:", result.rows[0]);
        console.log("board ctrl", result.rows[0])
        if(result.rows[0] == undefined){
            msg ="해당하는 정보가 없습니다.";
            url =`/board`
            let message = serCom.getMessage(msg,url);
            res.send(message);
        }else{
            return result;
        }
    },
    line : async (req, res) => {
        //console.log("board ctrl lineType:", req.body.lineType)
        const result = await ser.boardRead.line (req.body.start, req.body.lineType)
        res.render("board/board_line", { list: result.list, start:result.start, page: result.pageresult })
        console.log("board ctrl result:", result)
        
        return result;
    },
    data : async(req, res)=>{
        //const data= await ser.boardRead.data(req.params.P_TITLE);
        const P_HIT= req.session.P_TITLE;
        res.render("board/detail", {data:data, P_TITLE});
    }
}
const process= {
    write : async (req, res) => { //게시글 작성
        //console.log("ctrl: ",req.body)
        const msg = await ser.boardInsert.write(req.body, req.session.username);
        res.send(msg)
    },
    modify : async(req, res) => { 
        console.log('board ctrl',req.body);
        await ser.boardUpdate.modify(req.body)
        res.redirect("/board/detail/"+req.body.P_ID);

    },
    // delete : async(req, res) => { //게시글 삭제
    //     console.log("삭제기능") //콘솔로그로 찍어두었습니다 추후 삭제
    //     await ser.boardUpdate.delete(P_ID);
    //     res.redirect("/board")
    // }
    delete: async (req, res) => {
        console.log("삭제 요청 P_ID:", req.params.P_ID);  // P_ID 값을 확인
        const P_ID = req.params.P_ID;  // URL에서 P_ID 가져오기
    
        try {
            // 삭제 서비스 호출
            const result = await ser.boardUpdate.delete(P_ID);
            res.redirect('/board');
    
        } catch (error) {
            console.error("게시글 삭제 중 오류 발생:", error);
            res.status(500).json({ error: "게시글 삭제 실패" }); // 오류 처리
        }
    }
}


module.exports= { process, views }