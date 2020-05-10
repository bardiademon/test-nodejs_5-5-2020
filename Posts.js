const express = require ('express');

const Posts = require ('./model/Posts');

let router;
router = express.Router ();

router.get ("/" , (req , res) =>
{
    res.send ("test posts 1545");
    res.end ();
});

router.post ("/new" , async (req , res) =>
{
    const post = new Posts ({
        title : req.body.title ,
        body : req.body.body
    });

    try
    {
        const savedPost = await post.save ();
        res.json (savedPost);
    } catch (e)
    {
        res.json ({ message : e });
    } finally
    {
        res.end ();
    }

});

module.exports = router;