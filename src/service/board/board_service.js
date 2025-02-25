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
        //console.log("board ser list:", list.rows)
         
        list = serCom.dateSimple(list.rows) //시간 형식을 바꿔서 다시 리스트로 만들어주는 함수
        //console.log("board ser list수정후:", list)
        //console.log("start", start)
        //console.log("page", page)
        //console.log("list.length", list.rows.length)
        return { list, start, page } //dao에서 읽어온 list, 변환한 start, 총 page 값을 반환해준다.
    },


    data : async (P_ID) => { //게시물 수 업데이트 하는 기능 (클릭 할 때마다 조회수 +1)
        await dao.boardUpdate.upHit(P_ID);

    },
    detail: async ( P_ID ) => {//게시글 하나 눌렀을 때 보이는 페이지에 대한 것, 게시글의 고유번호를 주고받는다

        const contentList =  await dao.boardRead.detail (P_ID);


        list = serCom.timeModify(contentList.rows)
        //console.log("board ser detail:", list)
        return list; //리스트 형식으로 ctrl로 전송

    },
    search: async ( searchType, searchKey, start ) => {
        if( start == undefined )
            start = 1;
        start = Number(start);

        const totalCnt = await dao.boardRead.totalCnt(); ///dao에서 post table의 게시물 총 갯수를 세어온다.
        const num = totalCnt.rows[0]['COUNT(*)']; //{'COUNT(*)':8}에서 8만 추출하는 것
        const result = (num % 5 ==0)? 0:1;
        const page = parseInt(num/5 +result);

        const startNum = ( start-1 ) *5;
        
        //console.log("board serv ser type:", searchType)
        //console.log("board serv ser key:", searchKey)
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
        
        resultList = serCom.dateSimple(resultList.rows)
        //console.log(resultList)
        return resultList;
        
    },
    line : async (start, lineType) => {
        if( start == undefined )
            start = 1;
        start = Number(start);

        const totalCnt = await dao.boardRead.totalCnt(); ///dao에서 post table의 게시물 총 갯수를 세어온다.
        const num = totalCnt.rows[0]['COUNT(*)']; //{'COUNT(*)':8}에서 8만 추출하는 것
        const result = (num % 5 ==0)? 0:1;
        const page = parseInt(num/5 +result);

        const startNum = ( start-1 ) *5;

        //console.log("board ser 정렬조건: ", lineType)
        
        let resultList;
        if(lineType == "P_HITD"){//조회수 많은 순
            resultList = await dao.boardRead.lineHitDesc(startNum)
        }else if(lineType =="P_HITA"){//조회수 적은 순
            resultList = await dao.boardRead.lineHitAsc(startNum)
        }else if (lineType =="P_REPD"){//댓글 많은 순
            resultList = await dao.boardRead.lineReplyDesc(startNum)
        }else if (lineType =="P_REPA"){//댓글 적은 순
            resultList = await dao.boardRead.lineReplyAsc(startNum)
        }else if (lineType =="P_DATEN"){//작성일자 최신 순
            resultList = await dao.boardRead.lineDateNew(startNum)
        }else if (lineType =="P_DATEO"){//작성일자 오래된 순
            resultList = await dao.boardRead.lineDateOld(startNum)
        } 
        resultList = serCom.dateSimple(resultList.rows)
    
        
         return resultList;
        
    }
}
const boardInsert={ //게시글 작성
    write: async (body, username)=>{
        //console.log("ser:", body.P_ID)
    let msg, url;
    const  result = await dao.boardInsert.write(body, username);
    
    const num = await dao.boardInsert.latest();
    //console.log ("최신숫자", num.rows[0].LATEST)
    
    if(result !==0){
        msg = "등록 성공";
        url = "/board/detail/"+num.rows[0].LATEST;
        
    }else{
        msg = "등록 실패";
        url = "/board/write_form";
    }
    return serCom.getMessage(msg, url);
    }
}
const boardUpdate= {
    upHit : (P_HIT)=> { //조회수
        dao.boardUpdate.upHit(P_HIT);
    },
    delete : async(body) => { //삭제
        await dao.boardUpdate.delete(body);
    },
    modify : async(body) => { //수정
        //console.log('sevice modify',body)
        await dao.boardUpdate.modify(body);
    }
}
module.exports={boardRead, boardInsert, boardUpdate}