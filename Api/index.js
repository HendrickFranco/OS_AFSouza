const express = require('express');
const app = express();
const dotenv = require('dotenv');



dotenv.config();
//Import routes
const authRoute = require('./routes/auth');
const testeRoute = require('./routes/teste');

//connet to database


//Middlewares
app.use(express.json());

//rout middlewares
app.use('/api/user', authRoute);
app.use('/api/teste', testeRoute);

app.listen(3000, () =>{
console.log('Server up and running')
});
