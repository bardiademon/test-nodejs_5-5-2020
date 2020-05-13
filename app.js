const express = require ('express');
const bodyParser = require ('body-parser');
const cookieParser = require ('cookie-parser');
const engines = require ('consolidate');
const path = require ('path');

require ("dotenv/config")

const routerPosts = require ('./Posts');

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

mongoose.connect (process.env.db_connection , {
    useUnifiedTopology : true ,
    useNewUrlParser : true
} , () => console.log ("connected!"));

app.listen (process.env.port);


