const router=require("express").Router();
const ctrl=require('../../controller/calendar/calendar_ctrl')

//router.get('/',ctrl.sceduleList)
router.post("/write", ctrl.process.write);
router.get("/",ctrl.views.data);

router.post("/delete", ctrl.process.delete);
router.post("/modify", ctrl.process.modify);
module.exports=router;
