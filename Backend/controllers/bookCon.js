import { response } from "express";
import { Book } from "../models/Books.js";


// function to create a book
export const CreateBook = async (request ,response)=>{
try{
    if(
        !request.body.title ||
        !request.body.author ||
        !request.body.publishyear
    ){
        return response.status(300).send("Send all required datas");
    }

    const newBook = {
        title : request.body.title,
        author: request.body.author,
        publishyear: request.body.publishyear
    }

    const book = await Book.create(newBook);
    return response.status(400).send(book);

}
catch(error){
    console.log(error.message)
    return response.send(400).send({message:error.message})
}
}


// function to get all books
export const getAllBooks = async (request,response)=>{
 
     try{
        const books = await Book.find({})
        return response.status(200).json(books)

     }
     catch(error){
        console.log(error.message)
        return response.status(404).send({message: error.message})

     }

}



// function to a book By ID
export const FindBookById = async (request,response)=>{
 
    try{
        const {id}= request.params;

       const book = await Book.findById(id);
       return response.status(200).send(book);

    }
    catch(error){
       console.log(error.message)
       return response.status(404).send({message: error.message})

    }

}


//function to update a book
export const updateBook = async (request , response)=>{

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


}

//function to delete a book
export const deleteBook =  async (request,response)=>{
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
}