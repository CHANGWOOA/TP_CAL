
<<<<<<< HEAD
const ser=require("../../service/board/board_service")
const serCom= require("../../service/ser_common")
=======
const { user } = require("../../../config/database/db_config")
const ser = require("../../service/board/board_service")
const serCom= require("../../service/ser_common")

>>>>>>> master

const views={
    list : async (req, res)=>{ //게시글 기본 리스트 가져오는 기능
        const data = await ser.boardRead.list ( req.query.start ) //http://...//list?start=10 ->이 경우req.query.start =10
        res.render("board/board", { list: data.list, start:data.start, page: data.page })
    
        console.log("b ctrl views:", data.list, data.start, data.page)
    
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
        const data = contentList.rows //dao를 거쳐 온 P_ID글고유번호에 대한 해당 글의 정보 리스트를 배열형식으로 받아 data 변수에 저장
        res.render("board/board_detail", { data }) //data를 ejs로 보낸다-> 반복문 사용해서 건들여야 한다고...
        console.log("b ctrl detail:", data)
    },
    modifyForm : async (req, res) => {
        const data= await ser.boardRead.data(req.params.P_ID);
        //const data=[{}];
        console.log('modify form : ',data)
        res.render("board/modify_form", {data:data});

<<<<<<< HEAD
=======
    },
    search : async( req, res ) =>{ //글 검색하는 기능
        //console.log("board ctrl search:", req.body.searchKey)
        const result = await ser.boardRead.search( req.body.searchType, req.body.searchKey ) 
        //console.log("board ctrl search:", result);
        console.log("b ctrl search:", result)
        return result;
        
    },
    line : async (req, res) => {
        //console.log("board ctrl lineType:", req.body.lineType)
        const result = await ser.boardRead.line (req.body.start, req.body.lineType)
        res.render("board/board_line", { list: result.list, start:result.start, page: result.pageresult })
        console.log("board ctrl result:", result)
        
        return result;
>>>>>>> master
    }
    // ,
    // modify : async (req, res) => {
    //     const data= await ser.boardRead.data(req,params.P_ID);
    //     res.render("board/modify_form", {data})

    // }
}
const process= {
    write : async (req, res) => { //게시글 작성
        //console.log("ctrl: ",req.body)
        const msg = await ser.boardInsert.write(req.body, req.session.username);
        res.send(msg)
    },
    modify : (req, res) => { //게시글 수정 - 없어서 terminal이 난리라 만들어두었습니다.
        ser.boardUpdate.modify(req.body)
        res.redirect("/board/board_detail/"+req.body.P_ID);

    },
    delete : (req, res) => { //게시글 삭제
        console.log("삭제기능") //콘솔로그로 찍어두었습니다 추후 삭제
        ser.boardUpdate.delete(req.params.P_ID);
        res.redirect("/board")
    }
}
module.exports= { process, views }