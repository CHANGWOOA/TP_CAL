const router= require("express").Router();
const ctrl= require("../../controller/board/board_ctrl")

router.get("/delete/:P_ID/:file_name", ctrl.process.delete);
router.get("/modify_form/:P_ID", ctrl.views.modifyForm);
router.post("/modify", upload.single('file_name'), ctrl.process.modify);

module.exports=router;