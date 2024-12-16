const con = require("../db_common");
// const oracledb = require("oracledb");
// const dbConfig = require("../../../config/database/db_config");
// oracledb.autoCommit = true;
// oracledb.outFormat = oracledb.OBJECT;

const todoRead = {
    list : async (username) => { //그냥보여주는 쿼리문
        
        const sql = `select * from TODOLIST where U_ID='${username}'`;
        //console.log("read", sql)
        let todo;
        try {
            todo = await(await con).execute( sql )
    
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
    write : async ( body, username) => { //투두리스트 입력하기
        const sql = `insert into TODOLIST (T_ID, U_ID, T_TITLE, T_PRIORITY, T_CHECK)
                    values (todolist_seq.nextval, '${username}', '${body.T_TITLE}', '${body.T_PRIORITY}', null)`;
        // const result = await (await con).execute( sql );
        
        // return result; //result 값이 1이면 성공한 것
        //console.log(sql)
        let result = 0;
        try{
            result = await(await con).execute(sql);
        }catch(err){
            console.log(err)
        }
        return result;
    },
    
    delete : async ( body ) => { //단순 삭제
        const sql = `delete from TODOLIST where T_TITLE = '${body.title}'`
    }
}

    const todoUpdate = { // to do list 수정, 삭제
        delete : async ( body ) =>{
            //console.log("dao todo 데이터", body);
            const sql = `delete from TODOLIST where T_TITLE='${body.T_TITLE}'`;
            return (await con).execute( sql );
        },
        modify : async ( body )=>{
            const sql = `update TODOLIST set T_TITLE='${body.T_TITLE}', T_PRIORITY='${body.T_PRIORITY}' WHERE T_id=${body.T_ID} `;
            return (await con).execute( sql );
        },
        priority : async ( body, username ) => { //중요도 추후에 수정하기
            const sql = `update TODOLIST set T_PRIORITY = '${body.priority}' where U_ID='${username} AND 'T_TITLE ='${body.title}'`
            const result = await (await con).execute ( sql );
            return result; 
            //성공적으로 수정되면 결과는 1이 될 것
        },
        checkbox : async ( body, username ) => { //완료 체크하기
            const sql = `update TODOLIST set T_CHECK = 'V' where U_ID='${username} AND T_TITLE = '${body.title}'`
            const result = await (await con).execute ( sql );
            // 업데이트 수정시 결과는 1이 될 것
        }
    }

module.exports = { todoRead, todoWrite, todoUpdate }
