const sessionCheck= (session) => {
    if(session==undefined || session.user==undefined){
        msg=`로그인 사용자만 접근 가능`;
        url='/'
        return getaMessage(msg, url);
    }
    return 0;
}
const getaMessage= (msg,url) => {
    return `<script>
        alert('${msg}');
        location.href='${url}';
    </script>`;
}
const timeModify= (list)=>{
    list= list.map(data=>{
        data['R_DATE']= data['R_DATE'].toLocaleString();
        return data;
    })
    return list;

}

module.exports={sessionCheck, getaMessage, timeModify}
