const express = require('express');
const server = express();
server.use(express.json());
const shortid =  require('shortid');//npm i shortid
let hubs = [];
server.post("/api/hubs",(req,res)=>{
const hubinfo = {
        id:shortid.generate(),
        name:req.body.name,
        cohort:req.body.cohort,
        lessonId:hubs.length+1
    };
    
    hubs.push(hubinfo);
    res.status(201).json(hubinfo);

});
server.get('/api/hubs',(req,res)=>{
    res.json(hubs)
})



const port = process.env.PORT || 3000
server.listen(3000,()=>console.log(`hub listening on the ${port} now`))