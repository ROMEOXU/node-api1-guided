const Joi = require('joi');
const express = require('express');
const server = express();
server.use(express.json());// FOR USING name:req.body.name
const course = [{id:1,name:'one'},{id:2,name:'two'}]
server.get('/',(req,res)=>{
  
    res.json('hello,tough world!')
})
server.get('/api/lessons',(req,res)=>{
   if (!course) res.status(500).json({errorMessage: "The user information could not be retrieved."});//not sure correct
    res.json(course)
})

server.post('/api/lessons',(req,res)=>{
const schema = {
    name:Joi.string().required()
}
const result = Joi.validate(req.body,schema);
if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
}
 
    const newlesson = {
     id:course.length + 1,
     name:req.body.name
 }
 course.push(newlesson);
 res.status(201).send(newlesson);

})
server.put('/api/lessons/:id',(req,res)=>{
    let eachCourse = course.find(c=>c.id===parseInt(req.params.id));
    if(!eachCourse) return res.status(404).send('not found the ID');
    const schema = {
        name: Joi.string().required()
    }
    const result = Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    eachCourse.name=req.body.name;
    res.send(eachCourse);
})

server.delete('/api/lessons/:id',(req,res)=>{
    let eachCourse = course.find(c=>c.id===parseInt(req.params.id));
    if (!eachCourse) return res.status(404).send('the lesson not Found');
    const index = course.indexOf(eachCourse);
    course.splice(index,1);
    res.send(eachCourse);

})

server.get('/api/lessons/:id',(req,res)=>{
   let eachCourse = course.find(c=>c.id===parseInt(req.params.id));
   if (!eachCourse){
       res.status(404).send('the lesson not found')
   }else{
       res.send(eachCourse)
   }
})
const port = process.env.PORT || 3000
server.listen(port,()=>console.log(`listening on the ${port} now`))

  