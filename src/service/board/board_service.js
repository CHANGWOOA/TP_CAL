const dao= require("../../database/board/board_dao")
const serCom = require("../ser_common")

const boardRead={
    list: async ( start ) =>{ //게시판을 눌렀을 때 보이는 메인페이지로 
        if( start == undefined )
            start = 1;
        start = Number(start);

        const totalCnt = await dao.boardRead.totalCnt(); ///dao에서 post table의 게시물 총 갯수를 세어온다.
        const num = totalCnt.rows[0]['COUNT(*)']; //{'COUNT(*)':8}에서 8만 추출하는 것
        const result = (num % 5 ==0)? 0:1;
        const page = parseInt(num/5 +result);

        const startNum = ( start-1 ) *5;

        let list = await dao.boardRead.list (startNum);
        //console.log("board ser list:", list)
        list = serCom.timeModify(list.rows) //시간 형식을 바꿔서 다시 리스트로 만들어주는 함수
        //console.log(list.length)
        //console.log("start", start)
        //console.log("page", page)
        //console.log("list.length", list.rows.length)
        return { list, start, page } //dao에서 읽어온 list, 변환한 start, 총 page 값을 반환해준다.
    },
    data : () => { //게시물 수 업데이트 하는 기능 (클릭 할 때마다 조회수 +1)

    },
    detail: async ( P_ID ) => {//게시글 하나 눌렀을 때 보이는 페이지에 대한 것, 게시글의 고유번호를 주고받는다
        const contentList =  await dao.boardRead.detail (P_ID);
        
        return contentList; //리스트 형식으로 ctrl로 전송
    },
    search: async ( searchType, searchKey ) => {
        //console.log("board ser 검색조건:", searchType)
        //console.log("board ser 검색키:", searchKey)
        let resultList;
        if(searchType == "T_ID"){
            resultList = await dao.boardRead.serTeam( searchKey )
        }else if(searchType == "U_ID" ){
            resultList = await dao.boardRead.serUID( searchKey )
        }else if(searchType == "P_TITLE" ){
            resultList = await dao.boardRead.serTitle( searchKey )
        }else if(searchType == "P_CONTENT" ){
            resultList = await dao.boardRead.serContent (searchKey)
        }
        return resultList;
    }
}
const boardInsert={ //게시글 작성
    write: ()=>{

    }
}
const boardUpdate= {
    upHit : ()=> { //조회수

    },
    delete : () => { //삭제

    },
    modify : () => { //수정

    }
}
module.exports={boardRead, boardInsert, boardUpdate}