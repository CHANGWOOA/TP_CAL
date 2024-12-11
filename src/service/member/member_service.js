//member_service.js
const dao = require("../../database/member/member_dao")

const getMessage = (msg, url) => {

    return `<script>
                alert("${msg}");location.href='${url}';
            </script>`;
}

const getList = async () => {
    const result = await dao.getList();
    //console.log("result from service : ", result)
    return result.rows;
}

const getMember = async( id ) => {
    const user = await dao.loginCheck( id );
    return user.rows[0]
}

const loginCheck = async( body, req, res ) => {
    //member_dao에서 불러온 데이터 근거 - 정보 존재, 일치 여부 체크
    let msg;
    let url;
    //console.log("mem ser - body: ",body)
    const result = await dao.loginCheck(body.id)
    //console.log("그럼 result?", result)
    //찬교님 작성: const result = await dao.loginCheck( body.usertyped_id) 
    //뷰에서 받아오는 값은 뷰에 지정된 id여야 해서 body.id로 수정했습니다.
    // 뷰에서 받아오는 값을 usertyped_id라고 지정
    if(result.rows.length == 0 ){
        msg = "존재하지 않는 ID입니다."
        url = "/"
    }else{
       if(result.rows[0].U_PW == body.pwd){
            
            req.session.username = body.id;
            req.session.name = result.rows[0].U_NAME

            //console.log("세션네임:", req.session.name)
            res.cookie("isLogin", true)
            msg = "로그인에 성공하였습니다."
            url = "/main"
        }else{
            msg = "비밀번호가 일치하지 않습니다."
            url = "/"
        }
    }
    return getMessage( msg, url );
}

const register = async(body) => {
    let result = await dao.register(body)
    //console.log("memser result:",result)
    let msg=``,url;
    //회원가입 진행했을 때의 결과
    if(result){
        msg += `${body.username}님 가입을 환영합니다`;
        url='/';
        // msg = `회원 가입에 성공하였습니다.`
        // url = `<script>location.href="/"</script>`
    }else{
        msg = `문제가 발생하였습니다.`
        url = `/`
    }
    return getMessage(msg, url)

}

const U_del = (id) => {
    dao.U_del(id);
}

const U_modify = (body) => {
    dao.U_modify(body)
}

module.exports = {getList, getMessage, getMember, loginCheck, register, U_del, U_modify}