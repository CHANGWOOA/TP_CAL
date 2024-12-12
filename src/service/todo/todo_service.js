const dao= require("../../database/todo/todo_dao")
const serCom = require("../ser_common")

const todoRead= {
    list : async() => {
        let todo = await dao.todoRead.list();
        // console.log('service',todo)
        return todo;
    }
}
const todoInsert= { //투두리스트 작성
    write : async(body) => {
        let msg, url;
        const  result = await dao.todoWrite.write(body);
        if(result !==0){
            msg = "등록 성공";
            url = "";
        }else{
            msg = "등록 실패";
            url = "";
        }
        return serCom.getMessage(msg, url);
    }
}
const todoUpdate= {
    delete : () => { //투두리스트 삭제

    },
    modify : () => { //투두리스트 수정

    }
}
module.exports= {todoRead, todoInsert, todoUpdate}