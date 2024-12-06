const router= require("express").Router();
const ctrl= require("../../controller/board/board_ctrl")


router.get("/", (req, res)=> res.send("게시판 페이지입니다다다다"))
router.get("/list", ctrl.views.list)




module.exports=router;