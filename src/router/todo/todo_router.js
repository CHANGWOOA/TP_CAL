const router= require("express").Router();
const ctrl=require('../../controller/todo/todo_ctrl');

router.post('/newtodo',(req,res)=>{
    console.log('new todo data ',req.body);
    // let todo=ctrl.views.data();
    // console.log('new todo todo ',todo);
    // res.render('todo/newtodo');
    res.redirect('/todo')
});

router.get('/',async(req,res)=>{
    let todolist=await ctrl.views.data();
    // console.log('zz',todolist);
    res.render('todo/todo',{todo:todolist})
});

module.exports=router;