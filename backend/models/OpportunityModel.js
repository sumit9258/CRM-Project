import mongoose, { Schema } from "mongoose";

const oppoSchema=new Schema({
    opportunitie:{
        type:String,
        required:true
    },
    company_name:{
        type:String,
        required:true
    },
    rate:{
        type:String,
        required:true
    },
    close_Date:{
        type:String,
        required:true
    },
    stage:{
        type:String,
        required:true
    },
    lead_Source:{
        type:String,
        required:true
    },
    AssignedTo:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
})


const opportunityModel= mongoose.model("opportunity",oppoSchema)
export default opportunityModel