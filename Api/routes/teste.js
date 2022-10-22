const router = require('express').Router();
const verify = require('../verifyToken');
const userDB = require("../data/userDB");

router.get('/apenasJwt', verify , (req, res) => {
    res.json(
        {
            post:
            {
                title: 'sla',
                description: 'dado q n deveria ter acesso'
            }
        })
})

router.get('/GetAllUsers', async  (req, res) => {
    console.log("teste")
    const users = await userDB.GetAllUsers();
    console.log(users);
    res.json(users)
})
module.exports = router;