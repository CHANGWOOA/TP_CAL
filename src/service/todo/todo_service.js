const dao= require("../../database/todo/todo_dao")
const serCom = require("../ser_common")

const todoRead= {
    list : async(username) => { //투두 읽어오기
        let todo = await dao.todoRead.list(username);
        //console.log('service',todo)
        return todo;
    }
}
const todoInsert= { //투두리스트 작성
    write : async(body, username) => {
        let msg, url;
        const  result = await dao.todoWrite.write(body, username);
        if(result !==0){
            msg = "등록 성공";
            url = "/todo";
        }else{
            msg = "등록 실패";
            url = "";
        }
        return serCom.getMessage(msg, url);
    }
}
const todoUpdate= { //to do list 수정, 삭제
    modify : async(body) => {
        //console.log('sevice modify', body)
        await dao.todoUpdate.modify(body);
    },
    delete : async(body) => {
        //console.log("todoservice data : ", body);
        await dao.todoUpdate.delete(body);

    },
    pUpdate : async (body, username) =>{
        //기존 이름과 제목이 똑같은 것만 업데이트하고,
        //업데이트 한 후에는 다시 리스트를 불러와서 보여준다
        let result;
        let list;
            result = await dao.todoUpdate.priority (body, username)
        if (result ==1){
            list = await dao.todoRead (username);
            return list;
        }else {
            let msg = "수정 실패"
            let url = "/todo"
            return serCom.getMessage(msg, url);
        }

    },
    complete : async (T_ID, U_ID, T_CHECK) => {
       let result;
       let list;
       result = await dao.todoUpdate.checkbox (T_ID, T_CHECK) 

       if (result == 1){
        list = await dao.todoRead (U_ID);
        return list;
       }else {
        let msg = "체크 실패"
        let url = "/todo"
        return serCom.getMessage(msg, url);
       }
    }
}
module.exports= {todoRead, todoInsert, todoUpdate}