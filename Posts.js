const express = require ('express');

const Posts = require ('./model/Posts');

let router;
router = express.Router ();

router.get ("/" , (req , res) =>
{
    res.send ("test posts 1545");
    res.end ();
});

router.post ("/new" , (req , res) =>
{
    const post = new Posts ({
        title : req.body.title ,
        body : req.body.body
    });

    post.save ().then (data =>
    {
        res.send (data);
        res.end ();
    }).catch (e =>
    {
        res.send (data.message);
        res.end ();
    });

});

module.exports = router;