const { autoCommit } = require("oracledb");
const con = require("../db_common");

const boardRead = {
    list : async ( start ) => { 
        //5줄 정렬, 나중에 필요하면 숫자를 바꾸면 되고, 오름차순으로 해두었습니다.
        //START는 현재페이지를 계산하는 수식에서 나온 변수임.
        
        const sql = `select * from Post order by P_ID desc
                    offset ${start} rows fetch next 10 rows only`;
        
        const list = await (await con).execute( sql )
        //console.log("board dao list:" ,list) rows형식으로 가져옴!!!
        
        return list;
      
    },
    detail: async ( P_ID ) => { //한 제목을 클릭했을때 글을 불러오는 요소 작성 필요 //일단 받아오는 것을 string으로 지정해둠
        const sql = `select * from POST where P_ID = ${ P_ID }`;
        const contentList = await ( await con ).execute( sql ); //해당 글과 관련된 데이터를 list형식으로 받아옴
        return contentList;
    },
    
    totalCnt: async() =>{ //게시글의 총 개수를 세는 함수
        let cnt;
        try{
            cnt = await (await con).execute(`select count(*) from post`) //post의 전체 행 갯수를 가져오는 쿼리문
        }catch(err){
            console.log(err)
        }
        return cnt;
    },
    serTeam : async ( searchKey ) =>{//Team 명으로 검색하는 기능
        
        const sql = `select * from POST where T_ID like '%${ searchKey }%'`
        const result = await (await con).execute( sql );
        //console.log(result)
            return result;
        }
    ,
    serUID : async ( searchKey ) => { //유저의 아이디로 검색하는 기능
        const sql = `select * from POST where U_ID like '%${searchKey}%'`
        //console.log(sql)
        const result = await (await con).execute (sql);
        //console.log("board dao:", result)
        return result;

    },
    serTitle : async ( searchKey ) =>{ // 제목에 해당 key가 포함된 경우 검색하는 기능 
        const sql = `select * from POST where P_TITLE like '%${searchKey}%'`
        const data = (await con).execute( sql ); //반환값은 array 형식이 될 것 같다.
        return data;
    },
    serContent : async ( searchKey ) =>{ //내용검색: 내용에 해당 key가 포함된 경우 검색하는 기능
        const sql = `select * from POST where P_CONTENT like '%${searchKey}%'`
        const data = (await con).execute( sql );
        return data;
    },
    lineHitDesc : async ( start ) => { //조회 수 많은 순으로 정렬
        
        const sql = `SELECT * FROM POST ORDER BY TO_NUMBER(P_HIT) DESC offset ${ start } rows fetch next 10 rows only`
        const data = await (await con).execute(sql);
        return data;   
    },
    lineHitAsc : async ( start ) => { //조회 수 적은 순으로 정렬
        const sql = `SELECT * FROM POST ORDER BY TO_NUMBER(P_HIT) ASC offset ${ start } rows fetch next 10 rows only` 
        const data = await (await con).execute(sql);
        return data;            
    },
    lineReplyDesc : async ( start ) => { //댓글 수 많은 순으로 정렬
        const sql = `select * from POST order by ${댓글수} desc
                    offset ${start} rows fetch next 10 rows only`
        const data = await (await con).execute(sql);
        return data;  
    },
    
    lineReplyAsc : async ( start ) => { //댓글 수 적은 순으로 정렬 
        const sql = `select * from POST order by ${댓글수} asc
                    offset ${start} rows fetch next 10 rows only` 
        const data = await (await con).execute(sql);
        return data;  
    },
    lineDateNew : async ( start ) =>{ // 날짜 최신 순으로 정렬
        const sql = `select * from POST order by P_DATE desc
                    offset ${start} rows fetch next 10 rows only`
        const data = await (await con).execute(sql);
        return data;
    },
    lineDateOld : async ( start ) => { //날짜 오래된 순으로 정렬
        const sql = `select * from POST order by P_DATE asc 
                    offset ${start} rows fetch next 10 rows only`
        const data = await (await con).execute( sql );
        return data;
    }
    
};

const boardInsert = {
    write : async (body, username) => { //새 게시글 작성
        //console.log("ddd: ", username)
        const sql = `INSERT INTO Post (P_ID, T_ID, U_ID, P_TITLE, P_HIT, P_CONTENT, P_DATE)
    VALUES (Post_seq.nextval, null, '${username}', '${body.title}', '0','${body.content}', sysdate)`

        //U_ID는 각 팀의 아이디인데, 글 쓸때에는 null로 하고, 업데이트 시 각 팀 명을 부여한다
        //P_ID는 자동적으로 증가하는 게시물 번호, hit은 0으로 초기화시키고, p_date는 현재시간을 입력하도록 쿼리문 작성함

        let result = 0;
        try{
            result = await(await con).execute(sql);
        }catch(err){
            console.log(err)
        }
        return result;
  },
  latest : async ( ) => { // 게시글 작성 후, 제일 최신 글(본인 글)로 작성
    const sql = `SELECT MAX(P_ID) AS latest FROM Post`
    const latestNum = await(await con).execute(sql);
    console.log(latestNum)
    return latestNum;
  }
};


const boardUpdate = { //게시물 수정, 게시물 삭제, 게시물 클릭시 조회수 +1 되는 기능
    upHit : async ( P_ID ) => {//detail과 함께 가야하므로 P_ID로 변경
        const sql = 
        `update post set P_hit = P_hit + 1 where P_ID=${P_ID}`;
         (await con).execute( sql );
    },
    delete : async ( body ) =>{ //게시글 삭제 기능, 게시글의 고유번호를 받아와서 고유번호 일치하는 글을 삭제함
        console.log(body)
        const sql = `delete from post where P_ID=${body}`;
        (await con).execute( sql );
    },
    modify : async ( body )=>{ //게시물 수정기능, 제목, 내용, 글쓴 날짜만 업데이트 가능하도록 하였고, 글 고유번호인 P_ID로 식별할 수 있도록 구현
        const sql = `update post set P_TITLE='${body.title}', P_CONTENT='${body.content}', P_DATE=sysdate where P_ID=${body.P_ID} `;
        return (await con).execute( sql );
    }
}
module.exports = { boardRead , boardInsert , boardUpdate };
