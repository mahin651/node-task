const express=require('express');
const router=express.Router();
const Joi=require('joi');


const users =[
    {id: 1,name:'atul'},
    {id: 2,name:'raj'},
    {id: 3,name:'akhilesh'},
]
router.get('/',(req,res)=>{
    res.send(users);
})
router.get('/:id', (req, res) => {
    const user = users.find(c=>c.id === parseInt(req.params.id));
    if (!cource) return res.status(404).send('the user with given id not avalible.');
     else return res.send(user);
 });

router.post('/', (req, res) => {
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
    
     const token = user.generateAuthToken();
  
    res.header("Authorization", "Bearer " + token)
    //.send(_.pick(user, ["_id", "name", "email"]));
    .send({ token });
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
const token = users.generateAuthToken();

res.send({ token });
function ValidateUser(user){
    const schema=
         Joi.object({name:Joi.string().min(3).required()});
         Joi.object({email:Joi.string().min(3).required()});
         
    
     return  schema.validate(user);
}

module.exports=router;