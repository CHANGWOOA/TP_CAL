const router= require("express").Router();
const ctrl=require('../../controller/todo/todo_ctrl');

// router.post('/newtodo',(req,res)=>{
//     console.log('new todo data ',req.body);
//     res.redirect('/todo')
// });
router.post("/newtodo", ctrl.process.write);
//router.post("/write", ctrl.process.write);
router.get("/", ctrl.views.list);

module.exports=router;