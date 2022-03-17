
const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://cluster0.ivduc.mongodb.net/nodeapp')
.then(()=> console.log('Connected to db'))
.catch(err => console.error('Could not connect to db',err));