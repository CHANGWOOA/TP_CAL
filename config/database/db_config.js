const dbConfig={
    user : "c##java" ,
    password : "1234" ,
    //connectString : "localhost:1521/xe" 
    //connectString :"localhost:1521/orcl" //집 컴퓨터
   connectString : "192.168.51.100:1521/xe" //다른 컴퓨터에서 접속시 사용 코드

}
module.exports = dbConfig
