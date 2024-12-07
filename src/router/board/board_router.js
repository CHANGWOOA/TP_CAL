const router= require("express").Router();
const ctrl= require("../../controller/board/board_ctrl")

router.get('/list', ctrl.views.list)

router.get('/detail/:P_ID', ctrl.views.detail) //board 제목 하나를 눌렀을때 나오는 글 창에 대한 경로

router.post('/search', (req,res)=>{
    res.send("검색페이지입니다.")
})
//ctrl.views.search


module.exports = router;