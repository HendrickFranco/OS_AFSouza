async function connect() {
    if (global.connection)
        return global.connection.connect();
    console.log(process.env.DB_CONNECT)
    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: 'postgres://kunctlkp:g99zjepXtaNjwfTPzq6hM90iYawoyedP@motty.db.elephantsql.com/kunctlkp',
        ssl: { rejectUnauthorized: false }
    });

    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Iniciou conexão no PostgreSQL!");

    client.release();

    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}

module.exports = { connect }