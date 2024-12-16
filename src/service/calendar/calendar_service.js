const dao= require("../../database/calendar/calendar_dao")
const serCom= require("../ser_common")

const calRead={
    data: async (username)=>{
       let cal= await dao.calRead.data(username);
       return cal;
    }
}
const calInsert={
    write: async (body, username)=>{

        let msg, url;
        const result= await dao.calInsert.write(body, username);
            if(result !==0){
                msg = "등록 성공";
                url = "/calendar";
                
            }else{
                msg = "등록 실패";
                url = "";
            }
            return serCom.getMessage(msg, url);

    }
}

const calUpdate= {
    modify : async(body)=>{
        console.log('service modify', body)
        await dao.calUpdate.modify(body);
    },
    delete : async(body)=>{
        await dao.calUpdate.delete(body);
    }
}
module.exports={calRead, calInsert, calUpdate}
