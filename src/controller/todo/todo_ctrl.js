const ser= require("../../service/todo/todo_service")
const serCom= require("../../service/ser_common")
const views = {
    list : async(req,res) => {
        const data= await ser.todoRead.list()
        console.log('todo ctrl',data)
        res.render("todo/todo",{todo:data['rows']})

    }
}
const process= {
    write : async(req, res) => {
        console.log("ctrl : ", req.body)
        const msg= await ser.todoInsert.write(req.body);
        res.send(msg)
    },
    delete : () => {

    },
    modify : () => {

    }
}
module.exports= {views, process}