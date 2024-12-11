const views = {
    list : () => {

    },
    writeForm : () => {

    },
    data : () => {
        let todo=[
            {
                title:'공중 회전 제비 다섯 바퀴 연속 돌기',
                priority: '3',
                id:'useghr',
                pk:'aaavv'
            },
            {
                title:'샐러드 야채 빼고 먹기 협회 워크샵',
                priority: '2',
                id:'users',
                pk:'aaahe'
            },
            {
                title:'지구는 샌드위치다!! 동아리 정기모임',
                priority: '1',
                id:'useeer',
                pk:'aaeywa'
            },
            {
                title:' 홈프로텍트 주식회사 "white-hands"',
                priority: '0',
                id:'useeer',
                pk:'aaeywa'
            }
        ];

        return todo;

    },
    modifyForm : () => {

    }
}
const process= {
    write : () => {

    },
    delete : () => {

    },
    modify : () => {

    }
}
module.exports= {views, process}