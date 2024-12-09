const con = require("../db_common")

const todoRead = {
    list : async () => { //그냥보여주는 쿼리문
        const sql = `select * from TODOLIST`;
    },
    lineupAsc : async () => { //낮은 순위 순으로 정렬
        const sql = `select * from TODOLIST order by T_PRIORITY asc fetch next 5 rows only;`
    },
    lineupDesc : async () => {
        const sql = `select * from TODOLIST order by T_PRIORITY desc fetch next 5 rows only;`
    }

}
const todoWrite = {
    write : async ( body ) => { //투두리스트 입력하기
        const sql = `insert into TODOLIST (T_ID, U_ID, T_TITLE, T_PRIORITY, T_CHECK)
                    values (todolist_seq.nextval, '${body.U_ID}', '${body.title}', '${body.priority}', null);`
        const result = await (await con).execute( sql );
        
        return result; //result 값이 1이면 성공한 것
    },
    priority : async ( body ) => { //중요도 추후에 수정하기
        const sql = `update TODOLIST set T_PRIORITY = '${body.priority}' where T_TITLE ='${body.title}'`
        const result = await (await con).execute ( sql );
        return result;
    },
    checkbox : async ( body ) => { //완료 체크하기
        const sql = `update TODOLIST set T_CHECKBOX = 'V' where T_TITLE = '${body.title}'`
    },
    delete : async ( body ) => { //단순 삭제
        const sql = `delete from TODOLIST where T_TITLE = '${body.title}'`
    }
    

}
module.exports = { todoRead, todoWrite }