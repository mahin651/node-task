const debug=require('debug')('app:startup');
const config=require('config');
const Joi=require('joi');
const helmet=require('helmet');
const morgan=require('morgan');
const express = require('express');
const req = require('express/lib/request');
const cources=require('./routes/cources')
const home=require('./routes/home');
const logger =require('./middleware/logger');
const app =express();
app.set('view engine','pug');
app.set('views','./views');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/cources',cources)
app.use('/',home)

const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://cluster0.ivduc.mongodb.net/nodeapp')
.then(()=> console.log('Connected to db'))
.catch(err => console.error('Could not connect to db',err));

//configruation
console.log('Application name : '+config.get('name'));
console.log('Mail server : '+config.get('mail.host'));
// console.log('Mail password : '+config.get('mail.password'));

if (app.get('env')==='development'){
    app.use(morgan('tiny'));
    debug('Morgan enabled.....');
}

app.use(function log(req,res,next){
    console.log('Logging.......');
      next();
    });

//port
 const port = process.env.PORT || 8000;
 app.listen(port,()=> console.log(`Listening on port ${port}...`));