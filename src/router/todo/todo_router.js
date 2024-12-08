const router= require("express").Router();
const ctrl=require('../../controller/todo/todo_ctrl');

router.post('/newtodo',(req,res)=>{
    console.log('new todo data ',req.body);
    // res.render('todo/newtodo');
    res.send('zz')
});

router.get('/',(req,res)=>{
    // 예시??
    const todolist=[];
    const mem=[
        '멤버1','멤버2','멤버3'
    ]
    const memtodo=[
    
        {
            name:'멤버1',
            todo: {
                // todo 항목 : 완료 여부
                '장 보기':'on',
                '과제':'off'
            }
        },
        {
            name:'멤버2',
            todo: {
                '책장 청소':'off',
                '병원 예약':'off'
            }
        },
        {
            name:'멤버3',
            todo: {
                '기말고사 준비':'off',
                '강아지 산책':'on',
                '온라인 강의':'on'
            }
        }
    ]
    res.render('todo/todo',{todolist:todolist,mem:mem,memtodo:memtodo})
});

module.exports=router;