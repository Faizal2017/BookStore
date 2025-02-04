import express, { response } from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
const app = express();

app.get("/",(request,response)=>{
   // console.log(request);
    return response.status(234).send("Welcome to tutuorial")
})

app.listen(PORT,()=>{
    console.log(`The server is running on PORT : ${PORT}`);
});

//to connect mongoDB 
mongoose.connect()