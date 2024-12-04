const express = require("express");
const path = require("path");

const app = express();
const router = require("./src/router/router")
app.use("/", router);

app.get("/login", () => {
    res.render("login");
})
app.get("/logout", () => {
    res.render("logout");
})

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use("/", router());

app.listen(3000, () => console.log("3000서버 구동"));
