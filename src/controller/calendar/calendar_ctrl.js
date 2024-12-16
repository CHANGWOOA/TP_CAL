const ser= require("../../service/calendar/calendar_service")
const serCom= require("../../service/ser_common")

const views={
    data: async(req, res)=>{
        const data= await ser.calRead.data(req.session.username)
        //console.log('ctrl views',data)
        res.render("calendar/calendar", {calendar:data.rows})
    }
}
const process={
    write : async(req, res) => {
        const msg= await ser.calInsert.write(req.body, req.session.username)
        //console.log('cal ctrl write', req.body);
        res.send(msg)
    },
    modify : async(req, res) => { 
        await ser.calUpdate.modify(req.body);
        res.redirect("/calendar");  
        },
    
    delete : async (req, res) => {     
        await ser.calUpdate.delete(req.body);
        res.redirect('/calendar');
        }
}
module.exports={views,process}
