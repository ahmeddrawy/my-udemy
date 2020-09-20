const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Course,validate} = require('../models/course');
///get all courses
router.get('/',async (req , res)=>{
        const courses =await Course.find();
        res.send(courses)
});
///add course to courses
router.post('/' ,auth, async(req,res)=>{
    const {error, value} = validate(req.body); ///return object has error and result
    ///if error is null then validated and will proceed
    if(!error){
        let course = new Course({
            name: req.body.name ,
            tags: req.body.tags
        });
        course = await course.save();
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
router.get('/:id',async(req,res)=>{
    const id =req.params.id;
    const course =await Course.findById(id);
    if(!course){
        res.status(404).send(`the course with the given id can't be found `);
        
    }
    else {
        res.send(course);
    }
});
/// to update course
router.put('/:id',async(req,res)=>{
    //validate if invalid return 400 - bad request
    const {error, value} =validate(req.body); ///return object has error and result
    if(error){
        const error_array = error.details.map((e)=>e.message)
        console.log(error_array);
        res.status(400).send(error_array);
        return ;
    }
    const id = req.params.id;
    const course = await Course.findByIdAndUpdate(id,{name:req.body.name},{
        new:true        /// to get the updated from database
    });
    // look up the course if not found return 404  not found
    if(!course){
        res.status(404).send("not found");
        return ;
    }
    // update and return the updated course
    res.send(course);
    return ;
});
/// to delete course by id
router.delete('/:id',[auth,admin],async(req , res)=>{
    const id =req.params.id;
    try {
        const course =await Course.findByIdAndRemove(id);
        if(!course){
            res.status(404).send("course not found");
            return ;
        }
        res.send(course);
    } catch (error) {
        console.log('error : ',error.message); // todo 
    }
});
module.exports = router ;