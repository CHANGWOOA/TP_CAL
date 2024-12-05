module.exports=(app)=>{
    const router=require('express').Router();


    router.get('/',(req,res)=>{
        res.render('login')
    });


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
    router.post('/main',(req,res)=>{
        res.render('index',{todolist:todolist})
    });

    router.get('/main',(req,res)=>{
        res.render('index',{todolist:todolist})
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

