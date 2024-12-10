const router= require("express").Router();

const ctrl= require("../../controller/board/board_reply_ctrl");
router.post("/register", ctrl.process.register)
router.get("/:R_ID", ctrl.views.data)

router.post("/modify", ctrl.process.modify)

module.exports=router;