const ser= require("../../service/todo/todo_service")
const serBoard = require("../../service/board/board_service")
const serCom= require("../../service/ser_common")
const memSer = require("../../service/member/member_service")

const views = {

    list : async(req,res) => {
        
        //console.log('session',req.session)
        const data= await ser.todoRead.list(req.session.username)
        //console.log('todo ctrl',data.rows)
        res.render("todo/todo",{ todo: data })
        //data.rows에서 data로 수정하였습니다.
        //밑에 data 함수와 return 값을 동일하게 지정해야
        //todolist.ejs에서 같은 형식을 사용할 수 있습니다.

    },
    data: async(req,res)=>{
        
        //console.log("todoctrl session name", req.session )
        //let user=req.session.username
        const data= await ser.todoRead.list(req.session.username)
        const boardList = await serBoard.boardRead.list(req.start)
        // console.log('todo ctrl data',data.rows)
        res.render('index',{todo:data, boardList:boardList})
    }
}
const process= {
    write : async(req, res) => {
        const msg= await ser.todoInsert.write(req.body, req.session.username);
        res.send(msg)
    },
    delete : () => {

    },
    modify : () => {

    },
    pUpdate : async (req, res) => {
        const result = await ser.todoUpdate.pUpdate (req.session.username)

    },
    complete : async (req, res) => {
        const result = await ser.todoUpdate.complete (req.body, req.username)
        res.send("업데이트 완료")
    }
}
module.exports= {views, process}