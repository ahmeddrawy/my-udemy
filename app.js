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
///get all courses
app.get('/api/courses',(req , res)=>{
    res.send(courses);
});
///ad course to courses
app.post('/api/courses' , (req,res)=>{
    const {error, value} = validateCourse(req.body); ///return object has error and result
    ///if error is null then validated and will proceed
    if(!error){
        console.log(value);
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
///ge course by id
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
/// to update course
app.put('/api/courses/:id',(req,res)=>{
    // look up the course if not found return 404  not found
    const id = req.params.id;
    const course = courses.find((course)=> course.id == req.params.id);
    if(!course){
        res.status(404).send("not found");
        return ;
    }

    //validate 
    //if invalid return 400 - bad request
    const {error, value} =validateCourse(req.body); ///return object has error and result

    if(error){
        const error_array = error.details.map((e)=>e.message)
        console.log(error_array);
        res.status(400).send(error_array);
        return ;
    }
    // update and return the updated course
    course.name = req.body.name;
    res.send(course);
    return ;
});
function validateCourse(course){
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });
    return schema.validate(course);
}
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});