const express = require ('express');

const router = express.Router ();

router.get ("/" , (req , res) =>
{
    res.send ("test posts 1545");
    res.end ();
});

module.exports = router;