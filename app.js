const express = require("express");


const app = express();
const router = require("./src/router/router")
app.use("/", router);

app.get("/login", () => {
    res.render("login");
})
app.get("/logout", () => {
    res.render("logout");
})

app.listen(3000, ()=>console.log("3000서버 실행"))