const ser = require("../../service/board/board_service")

const views={
    list : async (req, res)=>{ //게시글 기본 리스트 가져오는 기능
        const data = await ser.boardRead.list ( req.query.start ) //http://...//list?start=10 ->이 경우req.query.start =10
        res.render("board/board", { list: data.list, start:data.start, page: data.page })
    },
    writeForm : () => {

    },
    detail : async (req, res) => { //글 제목 클릭했을 때의 기능
        //console.log("ctrl에서의 params:", req.params.P_ID)
        const contentList = await ser.boardRead.detail (req.params.P_ID) //클릭 시 들어오는 params를 서비스로 전송하고
        //console.log("board ctrl:", contentList.rows)
        const data = contentList.rows //dao를 거쳐 온 P_ID글고유번호에 대한 해당 글의 정보 리스트를 배열형식으로 받아 data 변수에 저장
        res.render("board/board_detail", { data }) //data를 ejs로 보낸다-> 반복문 사용해서 건들여야 한다고...

    },
    modifyForm : async () => {

    },
    search : async( req, res ) =>{
        //console.log("board ctrl search:", req.body.searchKey)
        const resultList = await ser.boardRead.search( req.body.searchType, req.body.searchKey ) 
        //console.log("board ctrl search:", resultList);
        return resultList
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