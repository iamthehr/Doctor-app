const express=  require('express');
const colors = require('colors');
const morgan=require('morgan');
const dotenv= require('dotenv');
const cors=require("cors")
const  connectDB = require("./config/db");
const path = require('path')

// dotenv config

dotenv.config();
// mongodb connection 
connectDB();

// // rest object
const app=express();

// // middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// //routes
app.use('/api/v1/user', require("./routes/userRoutes"));
app.use('/api/v1/admin', require("./routes/adminRoutes"));
app.use('/api/v1/doctor', require("./routes/doctorRoutes"));


app.get("/", (req, res) => {
    console.log("working")
    return res.end("works");
});

// static files 
app.use(express.static(path.join(__dirname,"../client/build")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,"../client/build/index.html"));
  });

// // port 
const  port=process.env.PORT || 8080
// // listen port
app.listen(8080,()=>{
    console.log(`Server running in ${process.env.NODE_MODE} Mode on port 8080`
     );
});





