const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const todoRead = {
    list : async () => { //그냥보여주는 쿼리문
        let U_ID='user001';
        const sql = `select * from TODOLIST where U_ID='${U_ID}'`;
        let todo;
        try {
            let con = await oracledb.getConnection( dbConfig );
            todo = await con.execute( sql )
    
        } catch (err) { //err로 써줘야 밑에 에러랑 맞춰져서 error를 err로 수정했습니다.
            console.log( err )
        }
        // console.log('dao',todo)
        return todo;
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
        // const result = await (await con).execute( sql );
        
        // return result; //result 값이 1이면 성공한 것
        let result = 0;
        try{
            result = await(await con).execute(sql);
        }catch(err){
            console.log(err)
        }
        return result;
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