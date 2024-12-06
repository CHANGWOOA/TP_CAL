const router= require("express").Router();
const ctrl= require("../../controller/board/board_ctrl")


router.get("/write_form", ctrl.views.writeForm);
router.post("/write", ctrl.process.write);


module.exports=router;