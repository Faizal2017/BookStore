import express, { request, response } from "express";
import { PORT ,MONG0URL} from "./config.js";
import mongoose from "mongoose";
import BooksRoute from "./routes/BooksRoute.js";
import cors from "cors";


const app = express();
app.use(express.json());

//cors policy
app.use(cors({
    origin: 'http://localhost:5000/',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type'],
}))

app.get("/",(request,response)=>{
   // console.log(request);
    return response.status(234).send("Welcome to tutuorial")
})
//Book route
app.use('/books',BooksRoute)
//Riute to save new book

//to connect mongoDB 
mongoose.connect(MONG0URL)
.then(()=>{
    console.log("Database connected Successfully 👽");
    
app.listen(PORT,()=>{
    console.log(`The server is running on PORT : ${PORT}`);
});
})
.catch((error)=>{

    console.log(error);
})