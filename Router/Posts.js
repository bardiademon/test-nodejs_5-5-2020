import express from 'express';
import jwt from 'jsonwebtoken';
import Posts from "../model/Posts";
import { Types } from "mongoose";

let router;
router = express.Router ();

const validationToken = (req , res , next) =>
{
    const token = req.headers['token_login'];
    if (token !== undefined && token !== null)
    {
        req.token = token;
        next ();
    }
    else
    {
        res.status (403);
        res.json ({ result : 'not_login' });
        res.end ();
    }
};

router.post ("/new" , validationToken , async (req , res) =>
{
    await jwt.verify (req.token , process.env["security-jwt"] , null , async (err , account) =>
    {
        if (err)
        {
            res.status (403);
            res.json ({ result : 'not_login' });
        }
        else
        {
            const title = req.body.title;
            const body = req.body.body;
            if ((title !== undefined && body !== undefined) && (title !== null && body !== null))
            {
                const post = new Posts ({ title , body , account : Types.ObjectId (account._id) });
                try
                {
                    await post.save ();
                    res.json ({ result : "post_saved" });
                }
                catch (e)
                {
                    res.json ({ result : e.message });
                }
            }
            else res.json ({ result : 'error_body' });
        }
        res.end ();
    });
});


export default router;