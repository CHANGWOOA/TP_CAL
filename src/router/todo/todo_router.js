const router= require("express").Router();
const ctrl=require('../../controller/todo/todo_ctrl');

// router.post('/newtodo',(req,res)=>{
//     console.log('new todo data ',req.body);
//     res.redirect('/todo')
// });
router.post("/newtodo", ctrl.process.write);
//router.post("/write", ctrl.process.write);
router.get("/", ctrl.views.list);



router.post("/delete", ctrl.process.delete); //to do list 삭제
router.post("/modify", ctrl.process.modify); //to do list 수정

router.post("/update", ctrl.process.pUpdate); //중요도 업데이트 기능


module.exports=router;