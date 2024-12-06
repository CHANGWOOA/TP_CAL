module.exports=(app)=>{
    const router=require('express').Router();
    const bodyParser = require("body-parser")
    app.use(bodyParser.urlencoded())
    const memberRouter = require("./member/member_router")
    const boardRouter = require("./board/board_router")
    app.use("/member", memberRouter)
    app.use("/board", boardRouter)
    
    router.get('/calendar',(req,res)=>{
        res.render('calendar')
    })
    //캘린더 라우터 아직 만들어지지 않아서 그대로 두겠습니다.
    //이후 캘린더 라우터 만들어지면 옮기겠습니다.

   router.get('/logout', (req,res) => {
        res.session = null;
        res.redirect('/');
    })

    router.get('/',(req,res)=>{
        res.render('login')
    })

    router.post('/main',(req,res)=>{
        res.render('index',{todolist:todolist,boardList:boardList})
    })

    router.get('/main',(req,res)=>{
        res.render('index',{todolist:todolist,boardList:boardList})
    })
    return router;
}