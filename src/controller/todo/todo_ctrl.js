const ser= require("../../service/todo/todo_service")
const serCom= require("../../service/ser_common")
const views = {
    list : async(req,res) => {
        const data= await ser.todoRead.list(req.session.username)
        console.log('todo ctrl',data.rows)
        res.render("todo/todo",{todo:data.rows})

    }
}
const process= {
    write : async(req, res) => {
        //console.log("ctrl : ", req.session.username)
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