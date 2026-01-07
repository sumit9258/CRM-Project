import mongoose, { Schema } from "mongoose";

const TaskSchema=new Schema({
    Title:{
        type:String,
        required:true
    },
    DUE_DATE:{
        type:String,
        required:true
    },
    Due_Time:{
        type:String,
        required:true
    },
    Priority:{
        type:String,
        required:true
    },
    Assignee:{
        type:String,
        required:true
    },
    ContactDeal:{
        type:String,
        required:true
    },
    Reminder:{
        type:String,
    },
    Notes:{
        type:String,
        required:true
    },
})

const TasksModel= mongoose.model("Real Tasks",TaskSchema)
export default TasksModel