const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name :{
        type:String,
        require:true,
        
    },
    isPublished:{
        type : Boolean,
        default:false
    },
    tags:{
        type:Array,
        validate:{
            validator:function(v){
                return v && v.length >0;
            },
            message:'tags should be an array with min length 1'
        }
    }
});
const Course = mongoose.model('course',schema);
async function add(course){
    try {
        const result = await (new Course(course)).save();
        return result;
    }  catch(exception){
        let err = []
        for (const key in exception.errors) {
            if (exception.errors.hasOwnProperty(key)) {
                const message = exception.errors[key].message;
                err.push(message);
                // console.log(properties);
            }
        }
        return err;
    }
};
async function findAll(){
    try{
        const result = await Course.find();
        return result;
    }
    catch(error){
        console.log(error.message);
    }
}
module.exports ={
    add : add,
    findAll: findAll
}
