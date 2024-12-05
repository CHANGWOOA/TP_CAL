//member_service.js
const dao = require("../../database/member/member_dao")

const getMessage = (msg, url) => {
    return `<script>
                alert("${msg}")location.href=${url};
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

    const result = await dao.loginCheck( body.usertyped_id)
    // 뷰에서 받아오는 값을 usertyped_id라고 지정
    if(result.rows.length == 0 ){
        msg = "존재하지 않는 ID입니다."
        url = "/member/login_form"
    }else{
        if(result.rows[0].PWD == body.usertyped_pw){
            req.session.username = body.usertyped_id;
            req.session.name = result.rows[0].NAME
            res.cookie("isLogin", true)
            msg = "로그인에 성공하였습니다."
            url = "/"
        }else{
            msg = "비밀번호가 일치하지 않습니다."
            url = "/member/login_form"
        }
    }
    return getMessage( msg, url );
}

const register = async(body) => {
    let result = await dao.register(body)
    let msg="", url=""
    //회원가입 진행했을 때의 결과
    if(result){
        msg = `회원 가입에 성공하였습니다.`
        url = `/main`
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

Module.exports = {getList, getMessage, getMember, loginCheck, register, U_del, U_modify}