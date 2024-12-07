const router= require("express").Router();
const ctrl= require("../../controller/board/board_ctrl")

router.get('/list', ctrl.views.list)

router.get('/detail', (req,res)=>{
    res.render('board/board_detail') //board 제목 하나를 눌렀을때 나오는 글 창에 대한 경로 
})


module.exports = router;