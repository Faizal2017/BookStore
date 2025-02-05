import { response } from "express";
import { Book } from "../models/Books.js";

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