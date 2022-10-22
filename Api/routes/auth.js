const router = require('express').Router();
const userDB = require("../data/userDB");
const jwt = require('jsonwebtoken');
router.post('/register', async (req, res) => {
    res.send(await userDB.Cadastrar(req.body.name, req.body.password));
})

router.post('/login', async (req, res) => {
    console.log({ req })
    console.log(req.body)
    const user = await userDB.Login(req.body.name, req.body.password);   
    if (user && user.name) {
        //Create and assign a token
        const token = jwt.sign({ id: user.id, username: user.nome_usuario }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
    }
    else {
        res.send("Usuário e/ou senha inválidos")
    }
});


module.exports = router;