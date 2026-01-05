import express from "express"
import { AddTask, editStage, EditTask, fetchTask, GetLead, GetOpportunity, Lead, opportunity } from "../controllers/Task.js"
const taskRouter=express.Router()

taskRouter.post("/add-task",AddTask)
taskRouter.get("/fetch-task",fetchTask)
taskRouter.put("/edit-task/:id",EditTask)
taskRouter.post("/contact-lead",Lead)
taskRouter.get("/fetch-lead",GetLead)
taskRouter.post("/add-opportunity",opportunity)
taskRouter.get("/fetch-opportunity",GetOpportunity)
taskRouter.patch("/update-stage",editStage)


export default taskRouter