const sessionCheck= (session) => {
    if(session==undefined || session.user==undefined){
        msg=`로그인 사용자만 접근 가능`;
        url='/'
        return getMessage(msg, url);
    }
    return 0;
}
const getMessage= (msg,url) => {
    return `<script>
        alert('${msg}');
        location.href='${url}';
    </script>`;
}

const timeModify = ( list ) => { //날짜데이터를 localeString 형식으로 돌려줌- 2024.12.6. 오후 9시 09분 과 같은 형식으로..

    list = list.map( data => {
        data['P_DATE'] = data['P_DATE'].toLocaleString('ko-KR', { hour12: false });
        return data;
        
    })
    return list;
}
const dateSimple = ( list ) => { //날짜 데이터를 간단한 형식으로 돌려주는 함수
    list = list.map ( data => {
        
        data['P_DATE']= data['P_DATE'].toLocaleDateString('ko-KR'); // YYYY-MM-DD 형식
        return data;
    })
    return list;
}



module.exports={sessionCheck, getMessage, timeModify, dateSimple}
