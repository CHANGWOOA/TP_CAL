module.exports=(app)=>{
    const router=require('express').Router();
    const bodyParser = require("body-parser")
    app.use(bodyParser.urlencoded())
    const memberRouter = require("./member/member_router")
    app.use("/member", memberRouter)

    router.get('/',(req,res)=>{
        res.render('login')
    });

    router.post('/main',(req,res)=>{
        res.render('index')
    });

    router.get('/board',(req,res)=>{
        res.render('board/board')
    })

    router.get('/logout', (req,res) => {
        res.session = null;
        res.redirect('/');
    })

    return router;
}

