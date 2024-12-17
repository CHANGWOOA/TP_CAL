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

    router.get('/',(req,res)=>{
        res.render('login', {id : req.session.username})
    })

    router.get('/mypage',(req,res)=>{
        member=[
            {
                U_ID:'654132',
                U_PWD:'0000',
                U_TEL:'010-1324-8745',
                U_NAME:'헝은미',
            }
        ]
        res.render('mypage',{member:member[0]})
    })
    const memCtrl=require('../controller/member/member_ctrl');


     return router;
}
