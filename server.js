const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const collection = require("mongodb")
var path = require('path');

dotenv.config({path:"./config/config.env"});
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'images')));

const users = [
    {username:"Vinayak", password:"123456789"},
    {username:"Anjali", password:"987654321"},
]

app.get("/",(req,res)=>{

    const {token} = req.cookies;

    if(token){
        jwt.verify(token, process.env.JWT_SECRET_KEY, function(err,result){
            if(err){
               res.redirect('/index');     
            }else{
                res.sendFile(__dirname + "/login.html");
            }
        })

    }else{
    res.sendFile(__dirname + "/login.html");
    }
});

app.get("/signup",(req,res)=>{

    res.sendFile(__dirname + "/signup.html"); //goes to signup page
});

app.post("/login", async(req,res)=>{
    const {username, password} = req.body;
    const user = users.find((data) => data.username === username && data.password === password);

    if(user){
        const data = {
            username,
            date:Date(),
        }
        const token = jwt.sign(data, process.env.JWT_SECRET_KEY,{expiresIn:"10min"});
        console.log(token);
        res.cookie("token", token).redirect('/index');
    }else{
        res.redirect("/");
    }
});

//app.get("/overview",(req,res)=>{

//    res.sendFile(__dirname + "/overview.html");
//});



app.get("/index",(req,res)=>{
    const {token} = req.cookies
    console.log(token);

    jwt.verify(token, process.env.JWT_SECRET_KEY, function(err,result){
        if(err){
            res.redirect('/')
        }else{
            res.sendFile(__dirname + "/index.html");
        }
    })
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on ${process.env.PORT}`);
});