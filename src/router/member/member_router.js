const router = require("express").Router();
const ctrl = require("../../controller/member/member_ctrl");

router.post("/login_check", ctrl.loginCheck);
router.get("/logout", ctrl.logout);
router.post("/register", ctrl.register);

module.exports = router;
