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
    const calRouter= require("./calendar/calendar_router")


    app.use("/member", memberRouter)
    app.use("/todo",todoRouter)
    app.use("/board", boardRouter)
    app.use("/calendar", calRouter)

    const todoCtrl=require('../controller/todo/todo_ctrl');
    // router.post('/main',(req,res)=>{
    //     console.log('session post',req.session.username)
    //     console.log(todo_ctrl.views.list())
    //     res.render('index',{todo:todo_ctrl.views.list() ,boardList:boardList})
    // })

    const calCtrl= require('../controller/calendar/calendar_ctrl');
    router.get('/main', calCtrl.views.data)
    router.get('/main', todoCtrl.views.data)

    router.get("/database", async(req,res) =>{
        let connection;
        connection = await getConnection();
        const result = await connection.execute("select * from ALLUSER")
        res.json(result.rows);
    })

    router.get('/logout', (req,res) => {
        res.session = null;
        res.redirect('/');
    })
    router.get('/mypage', (req,res) => {
        const zzz=require('../controller/calendar/calendar_ctrl')
        res.render('mypage',{calendar:zzz.views.data['rows']});
    })
    router.get('/',(req,res)=>{
        res.render('login', {id : req.session.username})
    })

    const boardList=[{
        title:'boardtitle',
        url:'aaa'
    }];

    const todo_ctrl=require('../controller/todo/todo_ctrl')

    router.get('/main',(req,res)=>{
        let todolist=todo_ctrl.views.data;
        res.render('index',{todo:todolist,boardList:boardList})
    })



     return router;
}
