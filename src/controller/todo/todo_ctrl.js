const ser= require("../../service/todo/todo_service")
const serBoard = require("../../service/board/board_service")
const serCom= require("../../service/ser_common")
const memSer = require("../../service/member/member_service")

const views = {

    list : async(req,res) => { //투두 읽어오기
        
        //console.log('session',req.session)
        const data= await ser.todoRead.list(req.session.username)
        console.log('todo ctrl',data.rows)
        res.render("todo/todo",{ todo: data })
        //data.rows에서 data로 수정하였습니다.
        //밑에 data 함수와 return 값을 동일하게 지정해야
        //todolist.ejs에서 같은 형식을 사용할 수 있습니다.

    },
    data: async(req,res)=>{
        //console.log("todoctrl session name", req.session )
        //let user=req.session.username
        const data= await ser.todoRead.list(req.session.username)
        const calendar=[]
        const boardList = await serBoard.boardRead.list(req.start)
        res.render('index',{todo:data, boardList:boardList,calendar:calendar})
    }
}

const process= {
    write : async(req, res) => { //투두 작성
        const msg= await ser.todoInsert.write(req.body, req.session.username);
        res.send(msg)
    },
    modify : async(req, res) => { //투두 수정
        //console.log('todo ctrl',req.body);
        try {
            await ser.todoUpdate.modify(req.body);
            res.redirect("/todo");
        } catch (error) {
            console.error("수정 오류 : ", error);
            res.status(500).json({error: "수정 실패"});
        }
        

    },
    delete : async (req, res) => { //투두 삭제
        try {
            //console.log("삭제 요청 데이터", req.body);  
            await ser.todoUpdate.delete(req.body);
            res.redirect('/todo');
    
        } catch (error) {
            //console.error("삭제 오류 발생:", error);
            res.status(500).json({ error: "삭제 실패" }); // 오류 처리
        }

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