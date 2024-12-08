module.exports=(app)=>{
    const router=require('express').Router();
    const bodyParser = require("body-parser")
    app.use(bodyParser.urlencoded())
    const memberRouter = require("./member/member_router")
    const todoRouter=require("./todo/todo_router")

    app.use("/member", memberRouter)
    app.use("/todo",todoRouter)
    
    router.get('/calendar',(req,res)=>{
        res.render('calendar')
    })

    router.get('/board',(req,res)=>{
        res.render('board/board')
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

    const todolist=[
        {
            title:'todotitle',
            memo:'todomemo',
            date:'tododate'
        }
    ]
    const boardList=[{
        title:'boardtitle',
        url:'aaa'
    }]
    return router;
}