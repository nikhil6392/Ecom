import mongoose from "mongoose"
import app from "./app"

import config from "./config/index"

//create a fun and run it 

(async()=>{
    try {
        await mongoose.connect(config.MONGODB_URI)
        console.log("DB is connected")

        app.on('error',(err)=>{
            console.log("Error",err)
            throw err
        })

        const onListening = ()=>{
            console.log(`Listening on ${config.PORT}`)
        }
        app.listen(config.PORT,)
        
    } catch(error) {
        console.log("error",error);
        throw error;
        
    }
})()
