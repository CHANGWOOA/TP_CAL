const express = require("express");
const path = require("path");
const app = express();
const router = require("./src/router/router");
const session = require("express-session")
const config = require("./config/cookie_session/cookie_session_config")
const bodyParser = require("body-parser")


app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use("/", router());

app.listen(3000, () => console.log("3000서버 구동"));
