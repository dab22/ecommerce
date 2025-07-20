const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {readdirSync} = require("fs");
const {connectDb} = require("./db/connection");

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

app.use(cors({origin: process.env.CLIENT_URL}));
app.use(express.json());

connectDb();

app.get("/", (req, res)=>{
    res.send(`<h1>Server running on port ${port}</h1>`);
});

readdirSync("./routes").map((route)=>
app.use("/api",require(`./routes/${route}`))
);

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});