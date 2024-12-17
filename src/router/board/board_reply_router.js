const router = require("express").Router();
const ctrl = require("../../controller/board/board_reply_ctrl");

router.post("/modify", ctrl.process.modify);

router.post("/:P_ID", ctrl.views.data);

router.post("/:P_ID/register", ctrl.process.repRegister);
//댓글 삭제 라우터 연결
router.post("/:P_ID/delete/:R_ID", ctrl.process.delete);
module.exports = router;
