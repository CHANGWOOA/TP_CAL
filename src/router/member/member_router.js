router.get("/login", ctrl.login )
router.get("/logout", ctrl.logout )
router.get("/register", ctrl.register )

const ctrl = require("../controller/member_ctrl")

module.exports = router;