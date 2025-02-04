import express, { response } from "express";
import { PORT ,MONG0URL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/Books.js";


const app = express();

app.get("/",(request,response)=>{
   // console.log(request);
    return response.status(234).send("Welcome to tutuorial")
})

app.use(express.json());
//Riute to save new book
app.post('/books',async(request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishyear
        ){
            return response.status(400).send({ message: "send all required data"})
        }

        const newBook = {
            title: request.body.title,
            author : request.body.author,
            publishyear:request.body.publishyear
        }

        const book = await Book.create(newBook)
        return response.status(201).send(book);
        
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// to get all books
app.get('/books',async (request,response)=>{
 
     try{
        const books = await Book.find({})
        return response.status(200).send(books)

     }
     catch(error){
        console.log(error.message)
        return response.status(404).send({message: error.message})

     }

})


//to find book by ID

// to get all books
app.get('/books/:id',async (request,response)=>{
 
    try{
        const {id}= request.params;

       const book = await Book.findById(id);
       return response.status(200).send(book);

    }
    catch(error){
       console.log(error.message)
       return response.status(404).send({message: error.message})

    }

})
//route to update a book
app.put('/books/:id',async (request , response)=>{

    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishyear
        ){
            return response.status(400).send({ message: "send all required data"})
        }

        const {id}= request.params;

        const result = await Book.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(404).json({message: 'book not found'});
        }
        



    }
    catch(error){
        console.log(error.message);
        response.status(400).send({message:error.message})
    }


})

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