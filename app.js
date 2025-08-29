const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');

const movieRoutes = require('./routes/movies');

app.use(bodyParser.json());
app.use('/movies',movieRoutes);

app.get('/', (req,res) =>{
    res.send('You are in home');
}); 

mongoose.connect(process.env.DB_CONNECTOR, ()=> {
    console.log('Connected to MongoDB');
});

app.listen(3000, ()=>{
    console.log('Server is up and running');
});
