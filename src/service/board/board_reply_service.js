const dao = require("../../database/board/board_reply_dao");

const repInsert = {
  register: async ({ P_ID, U_ID, content }) => {
    //코멘트 작성
    //console.log({ P_ID, U_ID, content })
    return await dao.repInsert.register({ P_ID, U_ID, content });
  },
};
const common = require("../ser_common");

const repRead = {
  data: async (P_ID) => {
    // 답글 번호 받아와 데이터 조회

    const replyList = await dao.repRead.data(P_ID); //조회한 댓글 데이터 시간 수정
    //console.log("서비스 : ", replyList)

    return replyList;
  },
};

const repCtrl = {
  delete: async (R_ID) => {
    console.log(R_ID);
    const result = await dao.repCtrl.delete(R_ID);
  },
  modify: (body) => {
    //답글 수정(미완성)
    dao.repUpdate.modify(body);
  },
};
module.exports = { repRead, repInsert, repCtrl };
