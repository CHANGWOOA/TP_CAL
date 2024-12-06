const ser = require("../../service/member/member_service")


const loginCheck = (req, res) => {
    console.log("mem ctrl:나와라")
}
const logout = (req, res) => {
    // 로그아웃
}
const register = async ( req, res ) => {
     //console.log("ctrl body:", req.body)
     let msg = await ser.register(req.body);
     res.send(msg);
     
}




module.exports = {loginCheck, logout, register}