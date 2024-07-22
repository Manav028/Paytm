const express = require("express");
const mainRouter = require("./routes/index")

const app = express();
const port = 3000;

app.use(express.json())

app.use("/api/v1",mainRouter);

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.listen(port)

