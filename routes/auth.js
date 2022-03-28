
const router = require("./");

router.post('/', (req, res) => {
    const {error}=ValidateUser(req.body);
    if(error){
        res.status(400),send(result.error.details[0].message);
        return;
    }

   const user={
         id: users.length +1,
         name:req.body.name,
         id:req.body._id,
         accessToken
        
     };
     const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
     res.json({accessToken:accessToken})
     users.push(user);
    res.send(user);
     });


     function validate(req){
        const schema=
             Joi.object({name:Joi.string().min(3).required()});
             Joi.object({email:Joi.string().min(3).required()});
         return  schema.validate(req);
    }

module.exports=router;