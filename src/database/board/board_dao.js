
const con = require("../db_common")
const boardRead = {
    list : async (start) => { //5줄 정렬, 나중에 필요하면 숫자를 바꾸면 되고, 오름차순으로 해두었습니다.
        //START는 현재페이지를 계산하는 수식에서 나온 변수임.
        
        const sql = `select * from Post order by P_ID asc
                    offset ${start} rows fetch next 5 rows only`;

        const list = await (await con).execute( sql )
        
        return list;
      
    },
    detail : async () => {//상세보기 기능

    },
    title : async ( string ) =>{ // 제목에 해당 string이 포함된 경우 검색하는 기능 
        const sql = `select * from POST where P_TITLE like %${string}%`
        const data = (await con).execute( sql ); //반환값은 array 형식이 될 것 같다.
        return data;
    },
    content : async ( string ) =>{ //내용검색: 내용에 해당 string 이 포함된 경우 검색하는 기능
        const sql = `select * from POST where P_CONTENT like %${string}%`
        const data = (await con).execute( sql );
        return data;
    }
}

const boardInsert = { //게시물 추가 쿼리문
    write : async ( body ) => {
        //console.log("body : ", body)
        const sql = 
`INSERT INTO Post (P_ID, T_ID, U_ID, P_TITLE, P_HIT, P_CONTENT, P_DATE)
VALUES (Post_seq.nextval, null, '${body.id}', '${body.title}', '0', '${body.content}', SYSDATE)`;
//body.id는 기존에 로그인 된 세션을 사용한다.=> 아직 세션 관련 지정하지 않아서 body.id로 넣어둠
//U_ID는 각 팀의 아이디인데, 글 쓸때에는 null로 하고, 업데이트 시 각 팀 명을 부여한다
//P_ID는 자동적으로 증가하는 게시물 번호, hit은 0으로 초기화시키고, p_date는 현재시간을 입력하도록 쿼리문 작성함
        let result = 0;
        try{
            result = await(await con).execute(sql, body);
        }catch(err){
            console.log(err)
        }
        return result;
    }
}


const boardUpdate = { //게시물 수정, 게시물 삭제, 게시물 클릭시 조회수 +1 되는 기능
    upHit : async ( num ) => {
        const sql = 
        `update post set P_hit = P_hit + 1 where P_ID=${num}`;
        (await con).execute( sql );
    },
    delete : async ( body ) =>{ //게시글 삭제 기능, 게시글의 고유번호를 받아와서 고유번호 일치하는 글을 삭제함
        const sql = `delete from post where P_ID='${P_ID}'`;
        (await con).execute( sql );
    },
    modify : async ( body )=>{ //게시물 수정기능, 제목, 내용, 글쓴 날짜만 업데이트 가능하도록 하였고, 글 고유번호인 P_ID로 식별할 수 있도록 구현
        const sql = `update post set P_TITLE='${P_TITLE}', P_CONTENT='${P_CONTENT}', P_DATE=sysdate where P_ID=${P_ID}; `;
        return (await con).execute( sql, body );
    }
}
module.exports = { boardRead , boardInsert , boardUpdate };