const views = {
    list : () => {

    },
    writeForm : () => {

    },
    data : () => {
        let todo=[
            {
                title:'공중회전제비 5바퀴 돌기',
                priority: '3',
                id:'user',
                pk:'aaa'
            },
            {
                title:'야채 뺀 샐러드 주문',
                priority: '3',
                id:'user',
                pk:'bbb'
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