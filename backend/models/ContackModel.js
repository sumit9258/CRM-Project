import mongoose, { Schema } from "mongoose";

const ContactSchema=new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    linked:{
        type:String,
        required:true

    },
    status:{
        type:String,
        required:true

    },
    
},{timestamps:true})

const ContactModel= mongoose.model("lead",ContactSchema)
export default ContactModel