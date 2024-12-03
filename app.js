const express = require("express");


const app = express();
const router = require("./src/router/router")


app.listen(3000, ()=>console.log("3000서버 구동"))