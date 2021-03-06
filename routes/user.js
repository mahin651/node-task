const express=require('express');
const router=express.Router();
const Joi=require('joi');
var jwt=require("jsonwebtoken");


const users =[
    {id: 1,name:'atul'},
    {id: 2,name:'raj'},
    {id: 3,name:'akhilesh'},
]
router.get('/',ensuretoken,(req,res)=>{
    res.send(users);
    res.json({
        text:'this is protected'
    })
})
router.get('/:id', (req, res) => {
    const user = users.find(c=>c.id === parseInt(req.params.id));
    if (!cource) return res.status(404).send('the user with given id not avalible.');
     else return res.send(user);
 });

router.post('/', (req, res) => {
    const token = jwt.sign({users},'my secret key');
    res.json({
        token:token
    })
     const {error}=ValidateUser(req.body);
     if(error){
         res.status(400),send(result.error.details[0].message);
         return;
     }
    const user={
          id: users.length +1,
          name:req.body.name,
          id:req.body._id
      };
      users.push(user);
     res.send(user);
     
      });

      router.put('/:id',(req,res)=>{
     const user=users.find(c=>c.id === parseInt(req.params.id));
     if(!cource) return res.status(404).send('The user with given Id was not avalible');
     const {error} =ValidateUser(req.body);
     if(error){
       return  res.status(400).send(error.details[0].message);

     }
     user.name=req.body.name;
 res.send(user);
 
 });

router.delete('/:id',(req,res)=>{
     const user=users.find(c=> c.id === parseInt(req.params.id));
     if(!user){

      return res.status(404).send('The user with given Id was not avalible');
     }
     const index =cources.indexOf(user);
     users.splice(index,1);

     res.send(users);
});

function ValidateUser(user){
    const schema=
         Joi.object({name:Joi.string().min(3).required()});
         Joi.object({email:Joi.string().min(3).required()});
         
    
     return  schema.validate(user);
}

function ensuretoken(req,res,next){
    const bearerheader=req.headers["authorization"];
    if(typeof bearerheader !=='undefined'){
        const bearer=bearerheader.split(" ");
        const bearerToken=bearer[1];
        req.token=bearerToken;
        next();}
        else{
       res.sendStatus(403);
        }

    }

module.exports=router;