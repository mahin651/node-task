
const number = require('joi/lib/types/number');
const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://new:new651@cluster0.ivduc.mongodb.net/nodeapp?retryWrites=true&w=majority')
.then(()=> console.log('Connected to db'))
.catch(err => console.error('Could not connect to db',err));

const courceSchema=new mongoose.Schema({
    name:{type:String,
        required:'Please enter the name',
        minlength:5,
        maxlength:255
    },
    category:{
        type:String,
        lowercase:true,
        required:'category is required',
         trim:true,  
         enum:['web','mobile','network']
    },
    author:String,
    
    tags:{
        type:Array,
        validate:{
       isAsync:true,
        validator:function(v,callback){
            setTimeout(() => {
                const result=v && v.lenght>0;
                callback(result);
            },4000);
        },
        message:'A cource should have atleast one tag.'
        }
    },
    date:{type:Date,default:Date.now},
    isPublished:Boolean,
    price:{
        type : Number,
        required:function() {return this.isPublished;},
        min:10,
        max:200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    
    }
});

const Cource= mongoose.model('Cource',courceSchema);
async function createCource(){
const  cource = new Cource({
 name:'Angular cource',
 category:'network',
author:'mosh',
tags:['angular','frontend'],
isPublished:true,
price:17
});

try{
    
 const result= await cource.save();
 console.log(result);
}
catch(ex){
    for(field in ex.errors)
    console.log(ex.errors[field].message);
}
}
createCource()
 
async function getCource(){
const pageNumber =2;
const pageSize =10;
const cources = await Cource.find({author:'mosh'})
// .find({price:{$gte :10},$lte:20})
// .find({ price: {$in:[10,20,30]}})
.sort({name:1})
.skip((pageNumber -1) * pageSize)
.limit(pageSize)
.select({name:1,tags:1,price:1})
console.log(cources);
}
getCource();

async function updateCource(id){
    const cource=await Cource.findById(id);
    if(!cource) return;
    cource.isPublished=true;
    cource.author='Another author';
    const result=await cource.save()
    console.log(result)
    // cource.set({
    //     isPublished:true,
    //     author:'Another author'
    // })
}
updateCource('6232e3b66570965012486d66');



