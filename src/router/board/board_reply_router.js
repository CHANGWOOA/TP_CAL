const router= require("express").Router();
const ctrl= require("../../controller/board/board_reply_ctrl");


router.post("/modify", ctrl.process.modify)

router.post("/:P_ID", ctrl.views.data)

router.post("/:P_ID/register", ctrl.process.repRegister)

module.exports=router;