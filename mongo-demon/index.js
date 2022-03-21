
const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://new:new651@cluster0.ivduc.mongodb.net/nodeapp?retryWrites=true&w=majority')
.then(()=> console.log('Connected to db'))
.catch(err => console.error('Could not connect to db',err));

const courceSchema=new mongoose.Schema({
    name:{type:String,required:true},
    author:String,
    tags:[String],
    date:{type:Date,default:Date.now},
    isPublished:Boolean
});

const Cource= mongoose.model('Cource',courceSchema);
async function createCource(){
const  cource = new Cource({
// name:'Angular cource',
author:'mosh',
tags:['angular','frontend'],
isPublished:true
});

try{
    const isValid =await cource.validate((err)=>{
        if(err){}
    })
 const result= await cource.save();
 console.log(result);
}
catch{
    console.log(ex.message);
}
}

async function getCource(){
const pageNumber =2;
const pageSize =10;
const cources = await Cource.find({author:'mosh'})
// .find({price:{$gte :10},$lte:20})
// .find({ price: {$in:[10,20,30]}})
.sort({name:1})
.skip((pageNumber -1) * pageSize)
.limit(pageSize)
.select({name:1,tags:1})
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


