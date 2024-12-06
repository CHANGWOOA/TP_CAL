const boardRead= {
    list : () => {

    },
    data : () => {

    }
}
const boardInsert = {
    write : async (body) => {
        //console.log("body : ", body)
        const sql = `INSERT INTO Post (P_ID, T_ID, U_ID, P_TITLE, P_HIT, P_CONTENT, P_DATE)
        VALUES (Post_seq.nextval, '${body.id}', null, '${body.title}', '0', '${body.content}', SYSDATE)`;
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
const boardUpdate = {
    delete : () => {
        
    },
    modify : () => {

    }

}
module.exports={boardInsert, boardRead, boardUpdate};