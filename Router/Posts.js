import express from 'express';
import jwt from 'jsonwebtoken';

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
    await jwt.verify (req.token , process.env["security-jwt"] , null , (err , account) =>
    {
        if (err)
        {
            res.status (403);
            res.json ({ result : 'not_login' });
        }
        else
        {
            res.json (account);
        }
        res.end ();
    });
});


export default router;