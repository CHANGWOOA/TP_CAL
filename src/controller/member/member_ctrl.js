const ser = require("../../service/member/member_service");

const loginCheck = async (req, res) => { //로그인 체크
    let msg = await ser.loginCheck(req.body, req, res)
    res.send(msg);
}
const logout = (req, res) => {
  // 로그아웃(미완성)
};
const register = async (req, res) => { //회원가입
  //console.log("ctrl body:", req.body)
  let msg = await ser.register(req.body);
  res.send(msg);
};

const getUser = async (req, res) => {
  let msg = await ser.getUser(req.session.username);
  console.log(msg)
  res.render('mypage', {list: msg})
};

module.exports = { loginCheck, logout, register,getUser };
