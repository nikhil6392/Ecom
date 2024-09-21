import Collection from "../models/collection.schema"
import asyncHandler from "../services/asyncHandler"
import CustomError from "../utils/customError"

export const createCollection = asyncHandler(async(req,res)=>{
    const {name}  = req.body

    if(!name){
        throw new CustomError("Collection name is required",400)
    }


    //Adding to the database
    const collection=await Collection.create({
        name
    })

    res.status(200).json({
        success:true,
        message:"Collection is Created",
        collection
    })
})

export const updateCollection = asyncHandler(async (req,res)=>{

    //getting the id for the collection
    const {id:collectionId}=req.params

    //getting the name from front end
    const {name}= req.body

    if(!name){
        throw new CustomError("Collection name is required",400)
    }

    let updateCollection = await Collection.findByIdAndUpdate(
        collectionId,
        {
            name,
        },
        {
            new: true,
            runValidator: true
        }
    )

    if(!updateCollection){
    
        throw new CustomError("Collection Not FOund", 404)
        
    }

    res.status(200).json({
        success:true,
        message:"Collection Updated to the database",
        updateCollection
    })
})

export const deleteCollection = asyncHandler(async(req,res)=>{
    const {id:collectionId}= req.params

    const collectionToDelete = await Collection.findByIdAndDelete(collectionId)

    if(!collectionId){
        throw new CustomError("Collection Not Found",404)
    }

    collectionToDelete.remove()

    res.status(200).json({
        success:true,
        message:"Collection is Deleted Successfully",
    })
})

export const getAllCollections= asyncHandler(async(req,res)=>{
    const collections = await Collection.find()

    if(!collections){
        throw new CustomError("No Collection Found",404)
    }
    res.status(201).json({
        success:true,
        message:"List of all collections",
        collections
    })
})