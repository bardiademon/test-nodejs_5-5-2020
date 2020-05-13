import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import engines from "consolidate";
import path from "path";
import routerPosts from "./Posts";
import jwt from "jsonwebtoken";

require ("dotenv/config");
let app;
app = express ();

app.use (bodyParser.json ());
app.use (cookieParser ());
app.use (express.static (path.join (__dirname , 'public' , 'views')));

app.engine ('html' , engines.mustache);
app.set ('view engine' , 'html');

const mongoose = require ('mongoose');
app.use ("/posts" , routerPosts);

app.get ("/" , async (req , res) =>
{
    res.status (200);
    res.setHeader ("Content-Type" , "text/html");

    res.cookie ("userData" , 'test cookie value');
    let isLogin = true;
    await res.render (path.join (__dirname , 'public' , 'views' , 'index.ejs') , { is_login : isLogin });
});

app.post ("/login" , (req , res) =>
{
    if ((req.body.username !== undefined && req.body.password !== undefined) && (req.body.username !== null && req.body.password !== null))
    {

    }
    else res.json ({ result : 'request is null' });

    res.end ();
});

mongoose.connect (process.env.connection , {
    useUnifiedTopology : true ,
    useNewUrlParser : true
} , () => console.log ("connected!"));

app.listen (process.env.port);


