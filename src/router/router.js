module.exports=(app)=>{
    const express = require("express");
    const getConnection = require("../database/db_common")
    app.use(express.json());

    const router=require('express').Router();
    const bodyParser = require("body-parser")
    app.use(bodyParser.urlencoded())
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


    return router;
}