const router= require("express").Router();
const ctrl= require("../../controller/board/board_ctrl")

router.post('/newboard',(req,res)=>{
    console.log('new baord data ',req.body);
    res.send('');
});


router.get("/write_form", ctrl.views.writeForm);
router.post("/write", ctrl.process.write);
router.get("/delete/:P_ID/:file_name", ctrl.process.delete);
// router.get("/modify_form/:P_ID", ctrl.views.modifyForm);
// router.post("/modify", upload.single('file_name'), ctrl.process.modify);


router.get('/', ctrl.views.list)
//기본 게시판 경로



router.get('/detail/:P_ID', ctrl.views.detail) 
//board 제목 하나를 눌렀을때 나오는 글 창에 대한 경로
//지금은 get방식으로 해두었는데 post방식으로 할 수 있으면 좋을것같다
//->글 제목을 검색창에 안보이게

router.post('/search', ctrl.views.search)

router.post('/lineUp', ctrl.views.line)
    //console.log(req.body.lineType)


router.get("/delete/:P_ID", ctrl.process.delete);

//은미님 코드
router.get("/modify_form/:P_ID", ctrl.views.modifyForm);
//우선 주석처리해두었습니다.
//ctrl.view.modifyForm과 대응이 필요!
router.post("/modify", ctrl.process.modify);
//ctrl.process에 modify가 없어서 






module.exports = router;