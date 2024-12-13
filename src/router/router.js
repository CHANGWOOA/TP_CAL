module.exports=(app)=>{
    const express = require("express");
    const getConnection = require("../database/db_common")
    app.use(express.json());

    const router=require('express').Router();

    const bodyParser = require("body-parser")
    app.use(bodyParser.urlencoded({ extended:true }))//bodyParser에 extended:true 추가
    app.use(bodyParser.json())
    
    const memberRouter = require("./member/member_router")
    const todoRouter=require("./todo/todo_router")
    const boardRouter = require("./board/board_router");
    // const calRouter=require('./calendar/calendar_router');



    app.use("/member", memberRouter)
    app.use("/todo",todoRouter)
    app.use("/board", boardRouter)

    const todoCtrl=require('../controller/todo/todo_ctrl');
    // router.post('/main',(req,res)=>{
    //     console.log('session post',req.session.username)
    //     console.log(todo_ctrl.views.list())
    //     res.render('index',{todo:todo_ctrl.views.list() ,boardList:boardList})
    // })


    router.get('/main', todoCtrl.views.data)

    router.get("/database", async(req,res) =>{
        let connection;
        connection = await getConnection();
        const result = await connection.execute("select * from ALLUSER")
        res.json(result.rows);
    })
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
        res.render('login', {id : req.session.username})
    })

     return router;
}


