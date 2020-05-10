const express = require ('express');
const bodyParser = require ('body-parser');

require ("dotenv/config")

const routerPosts = require ('./Posts');

let app;
app = express ();

app.use (bodyParser.json ());

const mongoose = require ('mongoose');
app.use ("/posts" , routerPosts);

app.get ("/" , (req , res) =>
{
    res.send ("/ Main router");
    res.end ();
});

mongoose.connect (process.env.db_connection , {
    useUnifiedTopology : true ,
    useNewUrlParser : true
} , () => console.log ("connected!"));

app.listen (3000);


