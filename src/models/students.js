const mongoose = require("mongoose");
const validator = require("validator");

const StudentList = new mongoose.Schema({
    name:{
        type:String,
        required:true
     
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email already in Use"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("inValid Email")
            }
        }
    },
    phone:{
        type:Number,
        required:true
    }
})

const Student = new mongoose.model("Student",StudentList);

module.exports = Student;