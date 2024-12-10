module.exports=(app)=>{
    const express = require("express");
    const getConnection = require("../database/db_common")
    app.use(express.json());

    const router=require('express').Router();
    
    const bodyParser = require("body-parser")
    app.use(bodyParser.urlencoded({ extended:true }))//bodyParser에 extended:true 추가
    app.use(bodyParser.json())
    
    const memberRouter = require("./member/member_router")
    app.use("/member", memberRouter)

    router.get("/database", async(req,res) =>{
        let connection;
        connection = await getConnection();
        const result = await connection.execute("select * from ALLUSER")
        res.json(result.rows);
    })
    

    const boardRouter = require("./board/board_router");
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

    const todolist=[
        {title:'바보',
            memo:'멍청이',
            date:'집에 보내줘'
        }
    ]
    const boardList=[
        {
            title:'board',
            url:'/zzz'
        }
    ]
    router.post('/main',(req,res)=>{
        res.render('index',{todolist:todolist,boardList:boardList})
    })

    router.get('/main',(req,res)=>{
        res.render('index',{todolist:todolist,boardList:boardList})
    })


    return router;
}