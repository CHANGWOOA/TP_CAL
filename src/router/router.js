module.exports=(app)=>{
    const router=require('express').Router();
    
    const bodyParser = require("body-parser")
    app.use(bodyParser.urlencoded())
    
    const memberRouter = require("./member/member_router")
    app.use("/member", memberRouter)
    
    const boardRouter = require("../router/board/board_router")
    app.use("/board", boardRouter )
    
    router.get('/calendar',(req,res)=>{
        res.render('calendar')
    })

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