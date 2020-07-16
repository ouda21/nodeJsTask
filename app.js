require('dotenv').config();
const express = require('express');
const app = express();
const route = require('./routes/index');
const bodyParser = require('body-parser');
const paginate = require('express-paginate');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(paginate.middleware(10,50));
app.use('/api/v1/',route);


const PORT = process.env.API_PORT;
app.listen(PORT,()=>{
    console.log('Listening on port '+ PORT);
});