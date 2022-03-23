
const number = require('joi/lib/types/number');
const string = require('joi/lib/types/string');
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
        type:String,
        },
    
       mycources: [{body:"string",type: mongoose.Schema.Types.ObjectId, ref: 'cources'}],
   designation:{
       type:String
   }
    
});

const User= mongoose.model('User',userSchema);
async function createUser(){
const  user = new User({
 name:'Moshify',
 email:'mosh651@gmail.com',
username:'mosh',
mycources:[],
designation:'user'
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
    user.username='Another author';
    const result=await user.save()
    console.log(result)
}
updateUser('62397510035e27e7e348350c');



