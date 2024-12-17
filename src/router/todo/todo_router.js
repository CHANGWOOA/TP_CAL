const router= require("express").Router();
const ctrl=require('../../controller/todo/todo_ctrl');

router.post("/newtodo", ctrl.process.write);
router.get("/", ctrl.views.list);
router.post("/delete", ctrl.process.delete); //to do list 삭제
router.post("/modify", ctrl.process.modify); //to do list 수정

router.post("/complete", ctrl.process.complete); //todolist 완료 시 체크박스


module.exports=router;