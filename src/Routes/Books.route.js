const express = require(`express`);
const BookRoutes = new express.Router();
const BooksModel=require('../Model/Books.model')
BookRoutes.get(``, async (req, res) => {
    try{
const books=await BooksModel.find();
console.log(books);
if(!books){
    throw new Error("Books not found")
}
res.status(200).send({
    message:'Books Fetched',data:books
})
    }catch(err){
res.status(500).send({message:err.message})
    }
});
BookRoutes.post(``,async (req,res)=>{
    try{
        const books=await new BooksModel(req.body)
        if(!books){
            throw new Error("Book not created")
        }
        const saved=await books.save();
        if(!saved){
            throw new Error("Book not created")
        }
        res.status(200).send({message:'Book added',data:books})
    }catch(err){
        res.status(500).send({
            message:err.message
        })
    }
})
BookRoutes.patch('/:id',async(req,res)=>{
    try{
        const book=await BooksModel.findById(req.params.id)
        if(!book){
            throw new Error("Book not found")
        }
        for(let keys in req.body){
           
            book[keys]=req.body[keys]
        }
        const saved=await book.save();
        if(!saved){
            throw new Error("Book not Updated")
        }
        res.status(200).send({message:'Book Details Updated',data:book})
    }catch(err){
        res.status(500).send({message:err.message})
    }
})
BookRoutes.delete(`/:id`,async(req,res)=>{
    try{
        const deletedItem=await BooksModel.findByIdAndDelete(req.params.id)
        if(!deletedItem){
            throw new Error(`Book not deleted`)
        }
        res.status(200).send({message:'book deleted'})
    }catch(err){
        res.status(500).send({message:err.message})
    }
})
module.exports = BookRoutes;
