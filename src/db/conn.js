const mongoose = require("mongoose");

const db = 'mongodb+srv://student:student123@cluster0.oevqeng.mongodb.net/student?retryWrites=true&w=majority'

mongoose.connect(db).then(()=>{
    console.log("connection successful")
}).catch((e)=>{
    console.log("no connection")
});