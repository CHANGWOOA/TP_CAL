const router= require("express").Router();
const ctrl= require("../../controller/board/board_ctrl")

router.get('/', ctrl.views.list)
//기본 게시판 경로

router.get('/detail/:P_ID', ctrl.views.detail) 
//board 제목 하나를 눌렀을때 나오는 글 창에 대한 경로
//지금은 get방식으로 해두었는데 post방식으로 할 수 있으면 좋을것같다
//->글 제목을 검색창에 안보이게

router.post('/search', ctrl.views.search)

router.post('/lineUp', ctrl.views.line)
    //console.log(req.body.lineType)


module.exports = router;