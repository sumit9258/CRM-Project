import mongoose, { Schema } from "mongoose";

const TaskSchema=new Schema({
    description:{
        type:String,
        required:true
    },
    due_date:{
        type:Date,
        required:true
    },
    priority:{
        type:String,
        required:true
    },
    company_name:{
        type:String,
    }
})

const TaskModel= mongoose.model("task",TaskSchema)
export default TaskModel