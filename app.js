const express = require("express");
const app = express();
const port = process.env.app || 5000;
require('./src/db/conn')
const Student = require('./src/models/students')

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("this is new app")
});

// ----------------> custome restapi using promisses <-------------------
// in promisses we use then and catch either it will be fulfill or either it will un fulfull
// its work such like real promises which we do in daily life

// app.post("/students",(req,res)=>{
//     console.log(req.body)
//     const user = new Student(req.body);
//     user.save().then(()=>{
//         res.send(user)
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })
// });

// ---------> custome restapi using asyn function <------------------

// we always use try and catch function when we using async for catching error if any occur

app.post("/students", async(req,res)=>{

    try{
        const user = new Student(req.body);
    const createUser = await user.save();
    res.send(createUser)
    }catch(e){
        res.status(400).send(e)
    }
})

//  ---------> now read all the data of registered students

app.get("/students", async(req,res)=>{
    try{
        const studentsData = await Student.find();
        res.send(studentsData);
    }catch(e){
        res.status(400).send(e)
    }
})

//  ---------> to read specfic student data by id we use findById function

app.get('/students/:id',async(req,res)=>{
    try{
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        res.send(studentData);
    }catch(e){
        res.send(e);
    }
})

//  ---------> to update specific cars data by id we use findByIdAndUpdate function, and for update we use patch

app.patch('/students/:id',async(req,res)=>{
    try{
        const _id = req.params.id;
        const studentUpdate = await Student.findByIdAndUpdate(_id,req.body, {
            new : true
        });
        res.send(studentUpdate);
    }catch(e){
        res.status(400).send(e);
    }
})

//  ---------> to delete specfic cars data by id we use findByIdAndDelete function, and for delete we use delete

app.delete('/students/:id',async(req,res)=>{
    try{
        const _id = req.params.id;
        const studentDelete = await Student.findByIdAndDelete(_id,req.body, {
            new : true
        });
        res.send(studentDelete);
    }catch(e){
        res.status(400).send(e);
    }
})

app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})