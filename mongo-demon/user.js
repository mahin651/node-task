
const number = require('joi/lib/types/number');
const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://new:new651@cluster0.ivduc.mongodb.net/nodeapp?retryWrites=true&w=majority')
.then(()=> console.log('Connected to db'))
.catch(err => console.error('Could not connect to db',err));

const userSchema=new mongoose.Schema({
    name:{type:String,
        required:'Please enter the name',
        minlength:5,
        maxlength:12
    },
    email:{
        type:String,
        required:'email is required'
    },
    
    username:{
        type:Array,
        }
    
});

const User= mongoose.model('User',userSchema);
async function createUser(){
const  user = new User({
 name:'Moshify',
 email:'mosh651@gmail.com',
username:'mosh',

});

try{
    
 const result= await user.save();
 console.log(result);
}
catch(ex){
    for(field in ex.errors)
    console.log(ex.errors[field].message);
}
}
createUser()
 
async function getUser(){
const pageNumber =2;
const pageSize =10;
const users = await User.find({author:'mosh'})
// .find({price:{$gte :10},$lte:20})
// .find({ price: {$in:[10,20,30]}})
.sort({name:1})
.skip((pageNumber -1) * pageSize)
.limit(pageSize)
.select({name:1})
console.log(users);
}
getUser();

async function updateUser(id){
    const user=await User.findById(id);
    if(!user) return;
    user.isPublished=true;
    user.author='Another author';
    const result=await user.save()
    console.log(result)
    // cource.set({
    //     isPublished:true,
    //     author:'Another author'
    // })
}
updateUser('6232e3b66570965012486d66');



