import express from "express";
import { Book } from "../models/Books.js";

const router = express.Router();

router.post('/',async(request,response)=>{
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
router.get('/',async (request,response)=>{
 
     try{
        const books = await Book.find({})
        return response.status(200).json("books")

     }
     catch(error){
        console.log(error.message)
        return response.status(404).send({message: error.message})

     }

})


//to find book by ID

// to get all books
router.get('/:id',async (request,response)=>{
 
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
router.put('/:id',async (request , response)=>{

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
        
        return response.status(404).send({message:'Book Updated Successfully'})



    }
    catch(error){
        console.log(error.message);
        response.status(400).send({message:error.message})
    }


})

//to delete
router.delete('/:id', async (request,response)=>{
    try{
        const {id}= request.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message:'Book not found'});

        }
        return response.status(202).send({message:'Deleted successfully'});

    }catch(error){
        console.log(error.message);
       return response.status(404).send({message:error.message});
    }
})
export default router;
