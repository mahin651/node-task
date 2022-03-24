const express=require('express');
const router=express.Router();
const Joi=require('joi');

const cources =[
    {id: 1,name:'cource1'},
    {id: 2,name:'cource2'},
    {id: 3,name:'cource3'},
]
router.get('/',(req,res)=>{
    res.send(cources);
})
router.get('/:id', (req, res) => {
    const cource = cources.find(c=>c.id === parseInt(req.params.id));
    if (!cource) return res.status(404).send('the cource with given id not avalible.');
     else return res.send(cource);
 });

router.post('/', (req, res) => {
     const {error}=ValidateCource(req.body);
     if(error){
         res.status(400),send(result.error.details[0].message);
         return;
     }
    const cource={
          id: cources.length +1,
          name:req.body.name,
          id:user.req.body._id

          
      };
     cources.push(cource);
     res.send(cource);
      });
router.put('/:id',(req,res)=>{
     const cource=cources.find(c=>c.id === parseInt(req.params.id));
     if(!cource) return res.status(404).send('The cource with given Id was not avalible');
     const {error} =ValidateCource(req.body);
     if(error){
       return  res.status(400).send(error.details[0].message);

     }
 cource.name=req.body.name;
 res.send(cource);
 });
router.delete('/:id',(req,res)=>{
     const cource=cources.find(c=> c.id === parseInt(req.params.id));
     if(!cource){

      return res.status(404).send('The cource with given Id was not avalible');
     }
     const index =cources.indexOf(cource);
    cources.splice(index,1);

     res.send(cources);
});
function ValidateCource(cource){
    const schema=
         Joi.object({name:Joi.string().min(3).required()});
    
     return  schema.validate(cource);
}
module.exports=router;