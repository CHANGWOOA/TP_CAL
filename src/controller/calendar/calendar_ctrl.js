const ser= require("../../service/calendar/calendar_service")
const serCom= require("../../service/ser_common")

const views={
    data: async(req, res)=>{ //캘린더 보이기, 세션의 이름을 가져와서 그 캘린더 출력
        const data= await ser.calRead.data(req.session.username)

        //console.log('ctrl views',data)s
        res.render("calendar/calendar", {calendar:data.rows})
    }
}
const process={
    write : async(req, res) => { //캘린더 작성
        const msg= await ser.calInsert.write(req.body, req.session.username)
        //console.log('cal ctrl write', req.body);
        res.send(msg)
    },
    modify : async(req, res) => { //캘린더 수정(미완성)
       console.log("cal ctrl", req.body)
        await ser.calUpdate.modify(req.body);
        res.redirect("/calendar");  
        },
    delete : async (req, res) => { //캘린더 삭제
        await ser.calUpdate.delete(req.body);
        res.redirect('/calendar');
        }
}
module.exports={views,process}
