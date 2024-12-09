const router= require("express").Router();
const ctrl= require("../../controller/board/board_ctrl")

router.post('/newboard',(req,res)=>{
    console.log('new baord data ',req.body);
    res.send('');
});


router.get("/write_form", ctrl.views.writeForm);
router.post("/write", ctrl.process.write);


module.exports=router;