const express = require('express');
const app = express();
const Joi = require('joi'); //return class

app.use(express.json());
let courses=[
    {id:1 , name:"c1"},
    {id :2 , name:"c2"}
];
app.get('/',(req ,res)=>{
    res.send('hello world');
});
app.get('/api/courses',(req , res)=>{
    res.send(courses);
});
app.post('/api/courses' , (req,res)=>{
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });
    
    const {error, result} = schema.validate(req.body); ///return object has error and result
    ///if error is null then validated and will proceed
    if(!error){
        console.log(result);
        const course = {
            id: courses.length +1,
            name: req.body.name ,
            
        };
        courses.push(course);
        res.send(course);
    }
    else{
        ///else in we have error object and details array 
        /// we map all messages from details array in an array to send to user
        const error_array = error.details.map((e)=>e.message)
        console.log(error_array);
        res.status(400).send(error_array);
    }
    // console.log(result);
});
/// api/courses/1
app.get('/api/courses/:id',(req,res)=>{
    console.log(req.params.id);
    const ret = courses.find((course)=> course.id == req.params.id);
    if(!ret){
        res.status(404).send(`the course with the given id can't be found `);
        
    }
    else {
        res.send(ret);
    }
    // console.log(ret);
});
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});