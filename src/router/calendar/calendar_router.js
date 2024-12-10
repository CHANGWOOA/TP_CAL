const router=require("express").Router();
const ctrl=require('../../controller/calendar/calendar_ctrl')

router.get('/',ctrl.sceduleList)
module.exports=router;