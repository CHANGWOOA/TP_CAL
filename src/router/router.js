module.exports=(app)=>{
    const router=require('express').Router();
    const bodyParser = require("body-parser")
    app.use(bodyParser.urlencoded())
    const memberRouter = require("./member/member_router")
    app.use("/member", memberRouter)

    router.get('/',(req,res)=>{
        res.render('login')
    });

<<<<<<< HEAD

    const todolist=[
        {title:'titletitle',
            memo:'memomemomemo',
            date:'2024-07-12'
        },
        {title:'titletitle',
            memo:'memomemomemo',
            date:'2024-08-12'
        },
        {title:'titletitle',
            memo:'memomemomemo',
            date:'2024-08-12'
        },
        {title:'titletitle',
            memo:'memomemomemo',
            date:'2024-08-12'
        },
        {title:'titletitle',
            memo:'memomemomemo',
            date:'2024-08-12'
        },
        {title:'titletitle',
            memo:'memomemomemo',
            date:'2024-09-12'
        }
    ];

    const boardList=[
        {
            title:'제목제목제목1',
            url:'aaaa'
        },        {
            title:'제목제목제목2',
            url:'aaaa'
        },
        {
            title:'제목제목제목3',
            url:'aaaa'
        },
        {
            title:'제목제목제목4',
            url:'aaaa'
        }
    ];
    router.post('/main',(req,res)=>{
        res.render('index',{todolist:todolist,boardList:boardList})
=======
    router.get('/main',(req,res)=>{
        res.render('index')
>>>>>>> 9eae4303a864698d03ac71008ebede355ea53b1d
    });

    router.get('/main',(req,res)=>{
        res.render('index',{todolist:todolist,boardList:boardList})

    })
    
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

    return router;
}

