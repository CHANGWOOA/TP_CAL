const router= require("express").Router();
const ctrl=require('../../controller/todo/todo_ctrl');

router.post('/newtodo',(req,res)=>{
    console.log('new todo data ',req.body);
    // res.render('todo/newtodo');
    res.send('zz')
});

router.get('/',(req,res)=>{
    const todolist=[]
    const memlist=['aaa','bbb','ccc','ddd','eee'];
    const teamlist=[]
    res.render('todo/todo',{todo:todolist,mem:memlist,team:teamlist})
});

module.exports=router;