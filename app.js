import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import engines from "consolidate";
import path from "path";
import jwt from "jsonwebtoken";
import sha256 from 'sha256';
import Account from "./model/Account";
import mongoose from "mongoose";

require ("dotenv/config");
const { isEmpty } = require ("jsprim");
let app;
app = express ();

app.use (bodyParser.json ());
app.use (cookieParser ());
app.use (express.static (path.join (__dirname , 'public' , 'views')));

app.engine ('html' , engines.mustache);
app.set ('view engine' , 'html');
app.get ("/" , async (req , res) =>
{
    res.status (200);
    res.setHeader ("Content-Type" , "text/html");

    res.cookie ("userData" , 'test cookie value');
    let isLogin = true;
    await res.render (path.join (__dirname , 'public' , 'views' , 'index.ejs') , { is_login : isLogin });
});

app.post ("/login" , async (req , res) =>
{
    res.set ("Content-Type" , "text/json");
    if ((req.body.username !== undefined && req.body.password !== undefined) && (req.body.username !== null && req.body.password !== null))
    {
        const password = sha256 (req.body.password , { asString : true });

        await Account.find ({
            username : req.body.username ,
            password
        } , async (err , info) =>
        {
            if (err || isEmpty (info)) res.json ({ result : 'not_found' });
            else
            {
                await jwt.sign ({ info } , "sec_key" , {} , (err , token) =>
                {
                    if (err) res.json ({ result : err.message });
                    else res.json ({ result : token });
                });
            }
            res.end ();
        });
    }
    else
    {
        res.json ({ result : 'request is null' });
        res.end ();
    }
});

mongoose.connect (process.env.connection , {
    useUnifiedTopology : true ,
    useNewUrlParser : true
} , () => console.log ("connected!"));

app.listen (process.env.port);


