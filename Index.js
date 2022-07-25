const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser =  require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true,origin:'http://localhost:3000'}));

const db = require("./models");

const postRouter = require("./routes/Posts");
app.use("/posts",postRouter);

const authRouter = require("./routes/Users");
app.use("/Auth",authRouter);

db.sequelize.sync().then(()=>
{app.listen(3001,()=>{
    console.log("Server running");
});
});