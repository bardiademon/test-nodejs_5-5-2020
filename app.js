const express = require ('express');

const routerPosts = require ('./Posts');

let app;
app = express ();

app.listen (3000);

app.use ("/posts" , routerPosts);

app.get ("/" , (req , res) =>
{
    res.send ("/index.html");
    res.end ();
});