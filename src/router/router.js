module.exports=(app)=>{
    const router=require('express').Router();


    router.get('/',(req,res)=>{
        res.render('login')
    });

    router.post('/main',(req,res)=>{
        res.render('index')
    });

    router.get('/board',(req,res)=>{
        res.render('board/board')
    })

    return router;
}
