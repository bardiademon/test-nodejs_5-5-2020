const express = require ('express');

const Posts = require ('./model/Posts');

let router;
router = express.Router ();

router.get ("/" , (req , res) =>
{
    res.send ("Posts");
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
    }
    catch (e)
    {
        res.json ({ message : e });
    }
    finally
    {
        res.end ();
    }

});

router.post ("/find" , async (req , res) =>
{
    try
    {
        const find = await Posts.find ();
        res.json (find);
    }
    catch (e)
    {
        res.json ({ message : e.message });
    }
    finally
    {
        res.end ();
    }
});

module.exports = router;