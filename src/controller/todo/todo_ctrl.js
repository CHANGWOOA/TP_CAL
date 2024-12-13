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
    modify : async(req, res) => { 
        //console.log('todo ctrl',req.body);
        try {
            await ser.todoUpdate.modify(req.body);
            res.redirect("/todo");
        } catch (error) {
            console.error("수정 오류 : ", error);
            res.status(500).json({error: "수정 실패"});
        }
        

    },
    delete : async (req, res) => {
    
        try {
            //console.log("삭제 요청 데이터", req.body);  
            await ser.todoUpdate.delete(req.body);
            res.redirect('/todo');
    
        } catch (error) {
            //console.error("삭제 오류 발생:", error);
            res.status(500).json({ error: "삭제 실패" }); // 오류 처리
        }
    }
}
module.exports= {views, process}