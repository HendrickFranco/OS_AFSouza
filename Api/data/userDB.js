const db = require("../data/db");;
const bcrypt = require('bcrypt');

const client = null;

async function Login(name, password) {
    const client = await db.connect();
    const sql = 'select * from usuario where nome_usuario =$1';
    const param = [name];
    const res = await client.query(sql, param);

    const user = {
        name: "",
        password: ""
    };
    var getUser = new Promise((resolve, reject) => {
        res.rows.forEach(async function (u, index, array) {
            if (!user.name) {
                await bcrypt.compare(password, u.senha).then(function (retorno) {
                    if (retorno) {
                        user.name = u.nome_usuario;
                        user.password = u.senha;
                    }
                    console.log(retorno)
                })
            }
            if (index === array.length - 1) {
                console.log(index)
                resolve();
            }
        });
    });
    await getUser.then(() => { console.log(user); });
    return user;
}

async function Cadastrar(name, password) {
    try {
        let cryptedPassword = "";
        await bcrypt.hash(password, 4).then((passHashed) =>
            cryptedPassword = passHashed
        );
        console.log("check");
        console.log(await CheckUserNameInUse(name));
        console.log(cryptedPassword)
        if (await CheckUserNameInUse(name)) {
            throw "Nome de usuário já existente."
        }
        const client = await db.connect();
        const sql = "insert into usuario (id,nome_usuario,senha) values (nextval('SEQ_ID_USUARIO'),$1,$2)";
        const param = [name, cryptedPassword];
        console.log({ param })
        await client.query(sql, param);
        return "Cadastrado com sucesso!";
    } catch (error) {
        return "Erro ao cadastrar novo usuário. \r\n" + error;
    }
}

async function CheckUserNameInUse(name) {
    const client = await db.connect();
    const sql = 'select 1 from usuario where nome_usuario =$1';
    const param = [name];
    const res = await client.query(sql, param);
    console.log(res.rows.length );
    return res.rows.length > 0 ? true : false;
}

async function GetAllUsers() {
    try {
        const client = await db.connect();
        const sql = 'select * from usuario'
        const res = await client.query(sql);
        return res.rows;
    }
    catch (error) {
        return error;
    }
}

module.exports = { Login, Cadastrar, GetAllUsers }