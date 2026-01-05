import mongoose from "mongoose"
import { configDotenv } from "dotenv";

configDotenv()

const ConDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB)
    } catch (error) {
        console.log(error);
        
    }
}

export default ConDb